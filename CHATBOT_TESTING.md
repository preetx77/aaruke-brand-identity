# Chatbot Testing Guide

## Quick Test Cases

### 1. Order Tracking (Core Feature)

Try these in the chat:
- ✅ "Track order ORD-001"
- ✅ "Where's my order ORD-002?"
- ✅ "Delivery status for ORD-003"
- ✅ "Show tracking for order 004"
- ❌ "Track order ORD-999" (non-existent order)

**Expected:** Bot shows order details with status, items, tracking number, and estimated delivery.

---

### 2. Shipping & Delivery

- ✅ "How long does shipping take?"
- ✅ "When will my order arrive?"
- ✅ "Do you have free shipping?"
- ✅ "Delivery timeframe?"

**Expected:** Shipping information with costs and timeframes.

---

### 3. Returns & Refunds

- ✅ "What's your return policy?"
- ✅ "Can I return this?"
- ✅ "Refund process"
- ✅ "How do I exchange?"

**Expected:** Clear return policy and next steps.

---

### 4. Payment & Security

- ✅ "What payment methods do you accept?"
- ✅ "Is it safe to pay?"
- ✅ "Do you take credit cards?"
- ✅ "Payment options?"

**Expected:** Payment methods and security assurance.

---

### 5. Product Information

- ✅ "Tell me about your collections"
- ✅ "What materials do you use?"
- ✅ "Are your products eco-friendly?"
- ✅ "What's the warranty?"

**Expected:** Product and material information.

---

### 6. Gifting

- ✅ "Do you offer gift wrapping?"
- ✅ "Perfect for gifts?"
- ✅ "Gift options?"

**Expected:** Gift information and personalization details.

---

### 7. Greeting & Help

- ✅ "Hi!" / "Hello"
- ✅ "What can you do?"
- ✅ "Help"
- ✅ "Thanks!"

**Expected:** Friendly greeting, feature list, or acknowledgment.

---

### 8. Demo Orders Status

| Order ID | Status | Items |
|----------|--------|-------|
| ORD-001 | 🚚 Shipped | Phoenix Collection - Gold, Exclusive Gift Box |
| ORD-002 | 📦 Delivered | Lion Spirit Collection, Premium Packaging |
| ORD-003 | ⚙️ Processing | Owl Wisdom Collection |
| ORD-004 | ⏳ Pending | Crab Guardian Collection, Deluxe Box |

---

## Feature Checklist

- [ ] Chat widget appears in bottom-right corner
- [ ] Can open/close chat window
- [ ] Messages appear with correct styling (user on right, bot on left)
- [ ] Bot avatar and header show correct branding
- [ ] Quick suggestion buttons work
- [ ] Typing indicator appears while waiting for response
- [ ] Order tracking shows formatted results
- [ ] FAQ answers appear correctly
- [ ] Smooth animations when opening/closing
- [ ] Works on mobile (responsive)

---

## Advanced Testing

### Intent Detection
The bot should recognize variations:
- "Track my order" = "Where is order ORD-001?"
- "Delivery status" = "When will it arrive?"
- "Warranty info" = "Is it guaranteed?"

### Context Awareness
Suggestions change based on conversation:
- Ask about order → Suggests "Shipping info", "Track another order"
- Ask about shipping → Suggests "Return policy", "Payment methods"

### Fallback Handling
Unclear questions should:
- Show "Not sure, but I can help with..." message
- List available topics
- Suggest related questions

---

## Performance Notes

- Message loading: ~500ms (simulated)
- Animations: Framer Motion smooth transitions
- No external API calls (all local rule-based)
- Responsive: Works on all screen sizes

---

## Browser Console

No errors should appear in the console. Check DevTools > Console if something doesn't work.

---

## Integration Points

The chatbot is integrated into:
- ✅ Main App.tsx component
- ✅ Available on all pages
- ✅ Persists across navigation
- ✅ Uses Tailwind for styling
- ✅ Matches brand colors (amber/orange gradient)

---

## Next Steps for Production

1. Connect to real order database
2. Add user authentication
3. Implement backend API endpoints
4. Add analytics tracking
5. Set up hand-off to human agents
6. Add multi-language support
7. Store conversation history
8. Add more sophisticated NLP

---

Questions? Check CHATBOT_GUIDE.md for architecture details!
