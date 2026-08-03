// Rule-based chatbot engine with order tracking and FAQ support

export interface Order {
  id: string;
  customerName: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: string[];
  total: number;
  createdDate: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock order database
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    status: 'shipped',
    items: ['Phoenix Collection - Gold', 'Exclusive Gift Box'],
    total: 299.99,
    createdDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    trackingNumber: 'TRK-123456789',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    status: 'delivered',
    items: ['Lion Spirit Collection', 'Premium Packaging'],
    total: 189.99,
    createdDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    estimatedDelivery: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    trackingNumber: 'TRK-987654321',
  },
  {
    id: 'ORD-003',
    customerName: 'Alex Johnson',
    status: 'processing',
    items: ['Owl Wisdom Collection'],
    total: 149.99,
    createdDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    trackingNumber: undefined,
  },
  {
    id: 'ORD-004',
    customerName: 'Sarah Brown',
    status: 'pending',
    items: ['Crab Guardian Collection', 'Deluxe Box'],
    total: 399.99,
    createdDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

// FAQ database
const faqDatabase: Record<string, string> = {
  'shipping': 'We offer free shipping on orders over $200. Standard delivery takes 5-7 business days. Express shipping (2-3 days) is available for $15.',
  'returns': 'We accept returns within 30 days of purchase for unused items in original condition. Contact our support team to initiate a return.',
  'payment': 'We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.',
  'warranty': 'All Aaruke products come with a 1-year manufacturer warranty covering defects in materials and workmanship.',
  'materials': 'Our products use premium, sustainably sourced materials with eco-friendly packaging. Each piece is handcrafted with attention to detail.',
  'collection': 'We have four unique spirit collections: Phoenix (rebirth), Lion (courage), Owl (wisdom), and Crab (resilience).',
  'gift': 'Perfect for gifts! We offer complimentary gift wrapping and personalized messages with every purchase.',
};

// Rule patterns for intent detection
interface Rule {
  pattern: RegExp;
  handler: (match: RegExpMatchArray | null, userMessage: string, orderId?: string) => string;
  keywords?: string[];
}

const rules: Rule[] = [
  // Order tracking rules
  {
    pattern: /order\s+(?:status|tracking|track|number)?[\s:]*(ORD-\d{3}|\d{3})/i,
    keywords: ['order', 'status', 'tracking', 'track', 'where'],
    handler: (match, userMessage) => {
      if (!match) return '';
      const orderId = match[1] || extractOrderId(userMessage);
      return getOrderStatus(orderId);
    },
  },
  {
    pattern: /track\s+(?:my\s+)?order|where\s+is\s+my\s+order|delivery\s+status/i,
    keywords: ['track', 'where', 'my order', 'delivery'],
    handler: () => {
      return 'To track your order, please provide your order ID (e.g., ORD-001). Do you have your order number?';
    },
  },
  {
    pattern: /my\s+latest\s+order|recent\s+order|last\s+order/i,
    keywords: ['latest', 'recent', 'last'],
    handler: () => {
      // In a real app, this would be linked to user account
      return 'To check your latest order, please provide your order ID. Or tell me the email address associated with your account.';
    },
  },

  // FAQ rules
  {
    pattern: /shipping|delivery|how\s+long|when\s+will|arrive/i,
    keywords: ['shipping', 'delivery', 'when'],
    handler: () => faqDatabase['shipping'],
  },
  {
    pattern: /return|refund|exchange/i,
    keywords: ['return', 'refund', 'exchange'],
    handler: () => faqDatabase['returns'],
  },
  {
    pattern: /payment|pay|credit\s+card|payment\s+method/i,
    keywords: ['payment', 'pay', 'credit card'],
    handler: () => faqDatabase['payment'],
  },
  {
    pattern: /warranty|guarantee|defect/i,
    keywords: ['warranty', 'guarantee', 'defect'],
    handler: () => faqDatabase['warranty'],
  },
  {
    pattern: /material|sustainable|eco|handcraft/i,
    keywords: ['material', 'sustainable', 'eco'],
    handler: () => faqDatabase['materials'],
  },
  {
    pattern: /collection|spirit|phoenix|lion|owl|crab/i,
    keywords: ['collection', 'spirit', 'phoenix', 'lion', 'owl', 'crab'],
    handler: () => faqDatabase['collection'],
  },
  {
    pattern: /gift|wrap|present/i,
    keywords: ['gift', 'wrap', 'present'],
    handler: () => faqDatabase['gift'],
  },

  // Greeting rules
  {
    pattern: /^(hi|hello|hey|greetings)/i,
    keywords: ['hi', 'hello', 'hey'],
    handler: () => "Hello! 👋 Welcome to Aaruke support. I'm here to help with order tracking, shipping info, and general questions. How can I assist you today?",
  },

  // Help rules
  {
    pattern: /help|what\s+can\s+you\s+do|capabilities/i,
    keywords: ['help', 'what can you do'],
    handler: () => `I can help you with:
• 📦 Track orders (provide your order ID like ORD-001)
• 🚚 Shipping & delivery information
• 💳 Payment & security questions
• 🔄 Returns & refunds
• ⚙️ Warranty & product info
• 🎁 Gift options & collections
• 📚 General Aaruke brand info

What would you like to know?`,
  },

  // Smart fallback responses
  {
    pattern: /thank|thanks|appreciate/i,
    keywords: ['thank', 'thanks'],
    handler: () => "You're welcome! Is there anything else I can help you with? 😊",
  },
  {
    pattern: /bye|goodbye|see\s+you|that's\s+all/i,
    keywords: ['bye', 'goodbye'],
    handler: () => "Goodbye! Thanks for choosing Aaruke. Have a wonderful day! 👋",
  },
];

// Helper functions
function extractOrderId(message: string): string {
  const match = message.match(/ORD-\d{3}|\b\d{3}\b/);
  return match ? match[0] : '';
}

function getOrderStatus(orderId: string): string {
  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return `I couldn't find an order with ID "${orderId}". Please check the order number and try again. (Available for demo: ORD-001, ORD-002, ORD-003, ORD-004)`;
  }

  const statusEmojis: Record<string, string> = {
    pending: '⏳',
    confirmed: '✅',
    processing: '⚙️',
    shipped: '🚚',
    delivered: '📦',
    cancelled: '❌',
  };

  let response = `\n📋 **Order ${order.id}**\n`;
  response += `Status: ${statusEmojis[order.status]} ${order.status.toUpperCase()}\n`;
  response += `Items: ${order.items.join(', ')}\n`;
  response += `Total: $${order.total.toFixed(2)}\n`;
  response += `Order Date: ${order.createdDate.toLocaleDateString()}\n`;

  if (order.trackingNumber) {
    response += `Tracking: ${order.trackingNumber}\n`;
  }

  if (order.estimatedDelivery) {
    response += `Est. Delivery: ${order.estimatedDelivery.toLocaleDateString()}\n`;
  }

  if (order.status === 'delivered') {
    response += `✨ Your order has been delivered!\n`;
  } else if (order.status === 'shipped') {
    response += `🚚 Your order is on the way!\n`;
  }

  return response;
}

export function processUserMessage(userMessage: string): string {
  const trimmedMessage = userMessage.trim().toLowerCase();

  // Try each rule in order
  for (const rule of rules) {
    const match = trimmedMessage.match(rule.pattern);
    if (match) {
      return rule.handler(match, trimmedMessage);
    }
  }

  // Smart fallback: suggest related topics
  return `I'm not sure about that, but I can help with:\n
• 📦 Order tracking & status\n
• 🚚 Shipping information\n
• 💳 Payment & security\n
• 🔄 Returns & refunds\n
• ⚙️ Product warranty\n
• 🎁 Collections & gifting\n\n
Try asking about any of these topics, or type "help" for more info!`;
}

export function generateSmartSuggestions(userMessage: string): string[] {
  const suggestions: string[] = [];
  const lower = userMessage.toLowerCase();

  // Context-aware suggestions
  if (lower.includes('order') || lower.includes('track')) {
    suggestions.push('Track another order');
    suggestions.push('Shipping info');
  }

  if (lower.includes('ship') || lower.includes('deliver')) {
    suggestions.push('Return policy');
    suggestions.push('Payment methods');
  }

  if (lower.includes('return') || lower.includes('refund')) {
    suggestions.push('Warranty info');
    suggestions.push('Contact support');
  }

  if (suggestions.length === 0) {
    suggestions.push('Track order');
    suggestions.push('Shipping info');
    suggestions.push('View collections');
  }

  return suggestions;
}

export { mockOrders };
