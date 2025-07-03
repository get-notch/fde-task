const express = require('express');
const { mixtilesData } = require('./mixtilesData');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory map to store return labels by order ID
const returnLabelsMap = new Map();
// this order id works B931E0C3
// GET /order/:id endpoint
app.get('/order/:id', (req, res) => {
  const orderId = req.params.id;
  
  // Check if the requested ID matches the ID in the mixtiles data
  if (orderId !== mixtilesData.id) {
    return res.status(404).json({ 
      error: 'Order not found' 
    });
  }
  
  res.json(mixtilesData);
});


app.post('/api/v1/notch/orders/:id/return-label', (req, res) => {
  const orderId = req.params.id;
  const returnLabel = req.body;
  
  // Add timestamp, order ID, and initial status to the return label
  const enrichedReturnLabel = {
    ...returnLabel,
    orderId: orderId,
    createdAt: new Date().toISOString(),
    id: `return-${orderId}-${Date.now()}`,
    status: 'in-progress' // Start with in-progress status
  };
  
  // Save the return label to the in-memory map with in-progress status
  returnLabelsMap.set(enrichedReturnLabel.id, enrichedReturnLabel);

  console.log('returnLabelsMap', returnLabelsMap);
  
  // Return immediate response that processing has started
  res.json({ 
    message: 'Return label creation started',
    returnLabel: enrichedReturnLabel
  });
  
  // Simulate processing time (15-40 seconds)
  const processingTime = Math.random() * (30 - 15) + 15; // Random between 15-40 seconds
  
  setTimeout(() => {
    // 90% chance of success, 10% chance of failure
    const isSuccess = Math.random() < 0.9;
    
    const finalStatus = isSuccess ? 'completed' : 'failed';
    
    // Update the return label with final status
    const finalReturnLabel = {
      ...enrichedReturnLabel,
      status: finalStatus,
      completedAt: new Date().toISOString()
    };
    
    // Save the final return label to the map
    returnLabelsMap.set(enrichedReturnLabel.id, finalReturnLabel);
    
    console.log(`Return label for id ${enrichedReturnLabel.id} ${finalStatus} after ${processingTime.toFixed(2)} seconds`);
  }, processingTime * 1000); // Convert to milliseconds
});


app.get('/api/v1/notch/orders/return-label', (req, res) => {
  const orderId = req.query.id;
  console.log('orderId', orderId);
  
  // Get return label from the in-memory map
  const returnLabel = returnLabelsMap.get(orderId);
  
  if (!returnLabel) {
    return res.status(404).json({ 
      error: 'Return label not found for this order' 
    });
  }
  
  res.json(returnLabel);
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;