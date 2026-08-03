# Aaruke Rule-Based Chatbot

A smart, rule-based customer support chatbot for order tracking and FAQ answering.

## Features

✅ **Order Tracking**
- Track orders by ID (e.g., ORD-001)
- Real-time status updates (pending, confirmed, processing, shipped, delivered)
- Tracking numbers and estimated delivery dates
- Demo orders: ORD-001, ORD-002, ORD-003, ORD-004

✅ **Smart FAQ System**
- Shipping & delivery information
- Returns & refunds policy
- Payment methods & security
- Product warranty & guarantees
- Material & sustainability info
- Gift options & collections

✅ **Intelligent Response Engine**
- Pattern-based intent detection
- Context-aware suggestions
- Natural language understanding
- Helpful fallback responses

✅ **User Experience**
- Floating chat widget (bottom-right)
- Smooth animations with Framer Motion
- Message history
- Quick suggestion buttons
- Mobile-friendly responsive design

## How It Works

### Rule Engine Architecture

The chatbot uses a **rule-based system** with pattern matching:

1. **Pattern Matching** - RegEx patterns detect user intent
2. **Intent Classification** - Rules route to appropriate handlers
3. **Smart Responses** - Context-aware answers from FAQ database or order system
4. **Suggestions** - Dynamic quick-reply suggestions based on conversation

### Key Components

**`/src/utils/chatbotRules.ts`**
- Core rule engine with pattern definitions
- Mock order database (4 demo orders)
- FAQ knowledge base
- Intent handlers and response generators

**`/src/components/sections/ChatBot.tsx`**
- React component with message UI
- Real-time chat interface
- Floating action button
- Animation with Framer Motion

### Demo Orders

Use these order IDs to test tracking:
- **ORD-001** - Shipped (in transit)
- **ORD-002** - Delivered
- **ORD-003** - Processing
- **ORD-004** - Pending

Try saying:
- "Where's my order ORD-001?"
- "Track ORD-002"
- "What's the status of order 003?"

### Supported Questions

**Order Tracking:**
- "Track my order"
- "Where's order ORD-001?"
- "Delivery status"
- "Show tracking number"

**Shipping:**
- "How long does shipping take?"
- "When will my order arrive?"
- "Free shipping?"

**Returns:**
- "Return policy"
- "Can I return?"
- "Refund process"

**General:**
- "What materials do you use?"
- "Do you offer gifts?"
- "Tell me about collections"
- "What's your warranty?"

## Customization

### Adding New Rules

Edit `/src/utils/chatbotRules.ts`:

```typescript
const rules: Rule[] = [
  {
    pattern: /your pattern here/i,
    keywords: ['keyword1', 'keyword2'],
    handler: (match, userMessage) => {
      return 'Your response here';
    },
  },
  // Add more rules...
];
```

### Adding FAQ Items

```typescript
const faqDatabase: Record<string, string> = {
  'your-topic': 'Your answer here',
  // Add more...
};
```

### Styling

The chatbot uses Tailwind CSS and follows your brand colors (amber-500 to orange-600 gradient). Edit colors in `/src/components/sections/ChatBot.tsx`.

## Future Enhancements

- 🔗 Connect to real order database
- 👤 User account integration
- 📊 Analytics & conversation tracking
- 🤖 Machine learning for better intent detection
- 🌍 Multi-language support
- 📞 Hand-off to human support agent
- 💾 Conversation history persistence
- 🔐 User authentication

## File Structure

```
src/
├── components/
│   └── sections/
│       └── ChatBot.tsx          # Main chat component
├── utils/
│   └── chatbotRules.ts          # Rule engine & handlers
└── App.tsx                       # ChatBot integrated
```

## Usage

The chatbot is automatically available on all pages as a floating widget in the bottom-right corner. Click the message icon to start chatting!

---

Built with React, TypeScript, Tailwind CSS, and Framer Motion.
