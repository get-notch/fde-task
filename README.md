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
- This is not a runtime task — we won't execute your code. Focus on code structure, parsing logic, and the quality of the output string.
- You are encouraged to think critically about what an LLM would find helpful when answering common customer support questions.

**What we're evaluating:**

- Your reasoning on what to include and how to structure the output
- Your code's readability and organization
- The clarity and usefulness of the generated string

*Use the following id: `B931E0C3`

### 📦 Task: Handle Return Label Creation

**Background:**

In e-commerce, return labels allow customers to send items back by providing them with a prepaid shipping label. At Notch, we connect to the APIs of our customers — e-commerce brands — in order to generate return labels for **their customers**.

**Your task:**

Implement the logic for handling return label creation using the following API endpoints:

- `POST /api/v1/notch/orders/{id}/return-label` — initiates return label creation.
- `GET /api/v1/notch/orders/return-label?id={id}` — returns the current status and label URL (if ready). If the label isn't ready, the URL will be an empty string.

**Considerations:**

- The label may take time to be ready.
- Think about how you'd handle waiting, retries, failures, and timeouts.
- You don't need to execute real requests — focus on structure and decision-making.

**Deliverable:**

Write a function (or small module) that handles this flow end-to-end and returns either the return label URL or a failure indication.

### 📝 General Notes

- You can use **TypeScript** to write your functions.
- You're free to use any external libraries you find helpful.
- Feel free to ask any questions throughout the assignment — we're happy to clarify anything that's unclear. You can reach Tomer at +972526140560 on whatsapp.
- You have **2 hours** to complete the assignment.
- Aim for clean, readable code and thoughtful handling of edge cases.
