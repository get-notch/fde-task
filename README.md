# fde-task
Forward Deployed Engineer Home Assignment

## 🧪 Testing Commands

### Production Environment Base URL
```
https://fde-task.onrender.com
```

### Task 1: Order Summary Context Generator
```bash
# Get order details for order ID B931E0C3
curl -X GET "https://fde-task.onrender.com/order/B931E0C3" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

### Task 2: Return Label Creation
```bash
# Step 1: Initiate return label creation
curl -X POST "https://fde-task.onrender.com/api/v1/notch/orders/B931E0C3/return-label" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"

# Step 2: Check return label status
curl -X GET "https://fde-task.onrender.com/api/v1/notch/orders/return-label?id={return_label_id}" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json"
```

### 🧠 Task: Order Summary Context Generator

**Background:**

You're building an AI agent to replace a customer support representative at **TilePic**, an e-commerce company that transforms personal photos into lightweight, stickable wall art. Customers upload their photos, select frame styles and sizes, and TilePic prints and ships the tiles directly to them. The tiles can be easily applied, removed, and repositioned without damaging walls .

**Your task:**

Create a function that receives an order ID, calls the `/order/:id` API, and returns a **single string**. This string will later be passed to a language model (LLM) which will use it to reason and answer questions such as:

- "Where is my order?"
- "Has it shipped yet?"
- "What discount did I get?"
- "When should I expect delivery?"

Your job is to decide what information from the response should be included and how to format it in a way that's useful for an LLM to process. You should prioritize clarity and completeness without being overly verbose.

**Important notes:**

- You can assume the API returns a consistent JSON structure like the one provided below (structure may vary between orders).
- You are encouraged to think critically about what an LLM would find helpful when answering common customer support questions.

**What we're evaluating:**

- Your reasoning on what to include and how to structure the output
- Your code's readability and organization
- The clarity and usefulness of the generated string

*For testing purposes use the following id: `B931E0C3`

### 📦 Task: Handle Return Label Creation

**Background:**

In e-commerce, return labels allow customers to send items back by providing them with a prepaid return label.
The way this works: 
- A customer makes a purchase online
- They receive the purchase and decide they want to return it (this could be for many reasons such as "damage" or "unhappy" etc.)
- They request a "return label" from the company
- The company approves the request and send a .pdf file with a "return label" to the customer
- The customer prints the return label, puts it on a package and sends it back to the company through the mail. The customer does not need to pay for the mail since the return label is prepaid.
- The company receives the package and continues handling of the issue (e.g sending a different item back to the customer or refunding the item)

At Notch, we connect to the APIs of our customers — e-commerce brands — in order to generate return labels for **their customers**.

**Your task:**

Implement the logic for handling return label creation using the following API endpoints:

- `POST /api/v1/notch/orders/{id}/return-label` — initiates return label creation.
- `GET /api/v1/notch/orders/return-label?id={id}` — returns the current status and label URL (if ready). If the label isn't ready, the URL will be an empty string.

**Considerations:**

- The label may take time to be ready.
- Think about how you'd handle waiting, retries, failures, and timeouts.
- You are expected to ask questions that will make this feature production ready. Don't hestitate to reach out.

**Deliverable:**

Write a function (or small module) that handles this flow end-to-end and returns both the string for the order summary and also either the return label URL or a failure indication.

### 📝 General Notes

- Use **TypeScript** to write your functions.
- You're free to use any external libraries you find helpful.
- Feel free to ask any questions throughout the assignment — we're happy to clarify anything that's unclear. You can reach Tomer at +972526140560 on whatsapp.
- Aim for clean, readable code and thoughtful handling of edge cases.
