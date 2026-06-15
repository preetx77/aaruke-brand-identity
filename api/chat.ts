import type { VercelRequest, VercelResponse } from '@vercel/node';

const AARUKE_CONTEXT = `You are Aarukè AI Assistant, a helpful luxury jewelry customer support bot for Aarukè - India's spirit animal jewelry brand.

About Aarukè:
- Premium luxury jewelry brand focused on spirit animal collections
- Flagship product: Phoenix Necklace representing rebirth and transformation
- Available in gold and silver
- Limited founder edition
- Handcrafted quality jewelry
- Made in India
- Perfect for gift-giving and personal collection

Product Information:
- Phoenix Necklace: ₹3,499 (Limited Edition)
- Themes: Rebirth, transformation, luxury, spirituality
- Materials: Gold, Silver
- Target audience: Luxury jewelry enthusiasts, spiritual seekers, collectors

Policies:
- Shipping: Fast delivery across India
- Returns: 30-day satisfaction guarantee
- Care: All jewelry comes with care instructions
- Customization: Available for certain products

Guidelines:
- Be warm, professional, and luxurious in tone
- Embody the premium brand voice
- Offer helpful product information
- Answer FAQs about shipping, returns, care
- If asked about products we don't have, politely redirect
- Keep responses concise but helpful
- Use emojis sparingly and elegantly (✨, 🎀, 💎)
- Always maintain brand sophistication`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: Message[];
  userMessage: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, userMessage } = req.body as RequestBody;

    if (!userMessage?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Build conversation history
    const conversationHistory = [
      ...messages.slice(-6), // Keep last 6 messages for context
      { role: 'user' as const, content: userMessage },
    ];

    // Call Hugging Face API (free, no credit card needed)
    const huggingFaceResponse = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1',
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: formatPrompt(AARUKE_CONTEXT, conversationHistory),
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            top_p: 0.95,
          },
        }),
      }
    );

    if (!huggingFaceResponse.ok) {
      console.error('HF API error:', await huggingFaceResponse.text());
      // Fallback to simple rule-based response
      const fallbackReply = generateFallbackReply(userMessage);
      return res.status(200).json({ reply: fallbackReply });
    }

    const result = await huggingFaceResponse.json();
    let reply = result[0]?.generated_text || '';

    // Clean up the response
    reply = extractAssistantResponse(reply);
    reply = reply.trim();

    if (!reply) {
      reply = generateFallbackReply(userMessage);
    }

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      reply: "I'm having trouble connecting. Please try again in a moment! 💎",
    });
  }
}

function formatPrompt(context: string, messages: Message[]): string {
  let prompt = `${context}\n\nConversation:`;

  for (const msg of messages) {
    prompt += `\n${msg.role === 'user' ? 'Customer' : 'Aarukè Assistant'}: ${msg.content}`;
  }

  prompt += `\nAarukè Assistant:`;
  return prompt;
}

function extractAssistantResponse(text: string): string {
  // Extract response after "Aarukè Assistant:" or similar markers
  const markers = [
    'Aarukè Assistant:',
    'Assistant:',
    'Customer:',
  ];

  for (const marker of markers) {
    const index = text.lastIndexOf(marker);
    if (index !== -1) {
      const extracted = text.substring(index + marker.length).trim();
      if (extracted && !extracted.startsWith('Customer')) {
        return extracted.split('Customer:')[0].trim();
      }
    }
  }

  return text.trim();
}

function generateFallbackReply(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Quick pattern matching for common questions
  if (message.includes('price') || message.includes('cost') || message.includes('₹')) {
    return "Our Phoenix Necklace is priced at ₹3,499 for the limited founder edition. This exquisite piece is available in both gold and silver finishes. 💎";
  }

  if (message.includes('ship') || message.includes('delivery')) {
    return "We offer fast shipping across India! Your order will be carefully packaged and delivered with tracking. We aim for delivery within 5-7 business days. ✨";
  }

  if (message.includes('care') || message.includes('clean')) {
    return "Your Aarukè jewelry deserves care! Always store in our luxury pouch, avoid harsh chemicals, and clean gently with a soft cloth. Detailed care instructions come with your purchase. 🎀";
  }

  if (message.includes('return') || message.includes('exchange')) {
    return "We offer a 30-day satisfaction guarantee. If you're not completely delighted, we'll work with you. Contact our support team for hassle-free returns! 💎";
  }

  if (message.includes('phoenix') || message.includes('collection')) {
    return "The Phoenix Necklace is our flagship piece, representing rebirth and transformation. Handcrafted with premium materials, it's a statement of luxury and spirituality. ✨";
  }

  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Welcome to Aarukè! I'm here to help with any questions about our luxury jewelry. What would you like to know? 🎀";
  }

  // Default response
  return "That's a wonderful question! I'd love to help. Could you share more details so I can better assist you? Feel free to ask about our products, shipping, care, or anything else! ✨";
}