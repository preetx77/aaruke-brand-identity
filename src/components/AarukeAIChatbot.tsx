import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const RESPONSES: { [key: string]: string } = {
  price: "Our Phoenix Necklace is priced at ₹3,499 for the limited founder edition. This exquisite piece is available in both gold and silver finishes. 💎",
  cost: "Our Phoenix Necklace is priced at ₹3,499 for the limited founder edition. This exquisite piece is available in both gold and silver finishes. 💎",
  shipping: "We offer fast shipping across India! Your order will be carefully packaged and delivered with tracking. We aim for delivery within 5-7 business days. ✨",
  delivery: "We offer fast shipping across India! Your order will be carefully packaged and delivered with tracking. We aim for delivery within 5-7 business days. ✨",
  ship: "We offer fast shipping across India! Your order will be carefully packaged and delivered with tracking. We aim for delivery within 5-7 business days. ✨",
  track: "To track your order, check your email for the tracking link sent after shipment. You can also contact us at support@aaruke.com with your order number. 📦",
  order: "To track your order, check your email for the tracking link sent after shipment. You can also contact us at support@aaruke.com with your order number. 📦",
  care: "Your Aarukè jewelry deserves care! Always store in our luxury pouch, avoid harsh chemicals, and clean gently with a soft cloth. Detailed care instructions come with your purchase. 🎀",
  clean: "Your Aarukè jewelry deserves care! Always store in our luxury pouch, avoid harsh chemicals, and clean gently with a soft cloth. Detailed care instructions come with your purchase. 🎀",
  return: "We offer a 30-day satisfaction guarantee. If you're not completely delighted, we'll work with you. Contact our support team for hassle-free returns! 💎",
  exchange: "We offer a 30-day satisfaction guarantee. If you're not completely delighted, we'll work with you. Contact our support team for hassle-free returns! 💎",
  phoenix: "The Phoenix Necklace is our flagship piece, representing rebirth and transformation. Handcrafted with premium materials, it's a statement of luxury and spirituality. ✨",
  collection: "The Phoenix Necklace is our flagship piece, representing rebirth and transformation. Handcrafted with premium materials, it's a statement of luxury and spirituality. ✨",
  hello: "Welcome to Aarukè! I'm here to help with any questions about our luxury jewelry. What would you like to know? 🎀",
  hi: "Welcome to Aarukè! I'm here to help with any questions about our luxury jewelry. What would you like to know? 🎀",
  hey: "Welcome to Aarukè! I'm here to help with any questions about our luxury jewelry. What would you like to know? 🎀",
  material: "Our Phoenix Necklace is handcrafted from premium gold and silver. Each piece is meticulously designed to ensure luxury and durability. ✨",
  gold: "Our Phoenix Necklace is available in premium gold. Each piece is handcrafted with attention to detail. ₹3,499 💎",
  silver: "Our Phoenix Necklace is available in premium silver. Each piece is handcrafted with attention to detail. ₹3,499 ✨",
  hand: "Yes! Our Phoenix Necklace is entirely handcrafted by skilled artisans. Each piece is unique and made with premium materials. 🎀",
  made: "Our jewelry is proudly made in India. We combine traditional craftsmanship with luxury design. 🇮🇳✨",
  gift: "A Phoenix Necklace makes the perfect luxury gift! It symbolizes rebirth and transformation. Comes beautifully packaged. 🎁💎",
};

function getResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for keyword matches
  for (const [keyword, response] of Object.entries(RESPONSES)) {
    if (lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  // Default response
  return "That's a wonderful question! I'd love to help. Could you share more details so I can better assist you? Feel free to ask about our products, shipping, care, or anything else! ✨";
}

export function AarukeAIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "✨ Welcome to Aarukè! I'm your luxury jewelry assistant. Ask me about our Phoenix collection, shipping, care instructions, or anything else!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setLoading(true);

    // Simulate thinking delay
    setTimeout(() => {
      const reply = getResponse(userInput);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-br from-amber-500 to-amber-700 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110 animate-bounce"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-2xl shadow-2xl w-96 h-[500px] flex flex-col border border-amber-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 flex justify-between items-center rounded-t-2xl">
            <div>
              <h3 className="font-bold text-lg">Aarukè Support</h3>
              <p className="text-xs text-amber-100">AI Assistant • Always here</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-full transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-white to-amber-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg text-sm leading-relaxed break-words ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-900 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-amber-200 p-3 bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 border border-amber-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 bg-amber-50"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-amber-600 text-white p-2 rounded-lg hover:bg-amber-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
