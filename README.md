# Aarukè | Headless Luxury E-Commerce

A bespoke, high-performance headless e-commerce storefront built for the luxury jewelry brand **Aarukè**. This application connects a custom, high-fidelity React frontend with Shopify's powerful backend via the Storefront GraphQL API.

## ✨ Key Features

* **Headless Architecture:** Fully decoupled frontend utilizing Shopify's Storefront API for inventory, checkout, and customer management.
* **Premium UI/UX:** Built with Tailwind CSS featuring glassmorphism, radial gradients, scroll-reveal animations, and an editorial typography system (Cormorant Garamond / Inter).
* **Secure Authentication:** Custom portal for user login and registration that interacts directly with Shopify's customer database via GraphQL mutations.
* **Dynamic Cart System:** Animated, slide-out cart drawer with real-time price calculation, quantity management, and seamless redirect to Shopify's secure checkout.
* **Mobile-First Design:** App-like mobile navigation with an intuitive hamburger menu, while maintaining expansive, editorial layouts on desktop screens.
* **AI Chatbot:** Rule-based customer support chatbot with order tracking and FAQ capabilities.

## 🛠 Tech Stack

* **Frontend Framework:** React.js (via Vite)
* **Styling:** Tailwind CSS
* **UI Components:** shadcn/ui + Radix UI
* **Backend / CMS:** Shopify Storefront API
* **Data Fetching:** GraphQL (via native Fetch API)
* **Icons:** Lucide React
* **Animations:** Framer Motion
* **Deployment:** Render / Vercel

## 🚀 Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
* Node.js (v16 or higher)
* A Shopify Partner account / Storefront API Access Token
* npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/preetx77/aaruke-brand-identity.git
cd aaruke-brand-identity
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Create a `.env.local` file in the root directory:
```
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
VITE_SHOPIFY_STORE_URL=your_store_url
```

### 4. Run the development server
```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## 📦 Chatbot Feature

This project includes a **rule-based AI chatbot** for customer support and order tracking.

### Features:
- 📦 **Order Tracking** - Real-time order status with tracking numbers
- 💬 **Smart FAQ** - Responses about shipping, returns, warranty, materials, gifting
- 🎯 **Intent Detection** - Pattern-based natural language understanding
- 💡 **Context-aware Suggestions** - Dynamic quick-reply suggestions
- ✨ **Smooth Animations** - Framer Motion powered UI

### Chatbot Usage:
Click the chat icon in the bottom-right corner to start a conversation. Try asking about:
- Order status (e.g., "Track order ORD-001")
- Shipping information
- Return policy
- Product collections and materials
- Gift options

### Demo Orders:
- **ORD-001** - Shipped
- **ORD-002** - Delivered
- **ORD-003** - Processing
- **ORD-004** - Pending

See `CHATBOT_GUIDE.md` for detailed architecture and customization guide.

## 📁 Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── ChatBot.tsx              # Chat UI component
│   │   ├── HeroSection.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── NavBar.tsx
│   │   └── ...
│   └── ui/                          # shadcn/ui components
├── utils/
│   └── chatbotRules.ts              # Rule engine & FAQ database
├── pages/
│   ├── Index.tsx                    # Main page with password gate
│   └── NotFound.tsx
├── App.tsx                          # Main app with ChatBot integration
└── main.tsx
```

## 🔧 Build & Deployment

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run start
```

### Run tests:
```bash
npm run test
```

### Lint code:
```bash
npm run lint
```

## 🔐 Development Password

The app is password protected in development. Use:
```
Password: Aaruke@6499
```

## 📚 Documentation

- **CHATBOT_GUIDE.md** - Detailed chatbot architecture and customization
- **CHATBOT_TESTING.md** - Testing guide with sample queries

## 🚀 Deployment

The app is ready for deployment on:
- **Render:** `npm run render-build && npm run render-start`
- **Vercel:** Connect GitHub repo directly
- **Traditional hosting:** Use `npm run build` to generate static files

## 📝 License

This project is proprietary and confidential to Aarukè.

## 👥 Contact

For questions or support, contact the development team.

---

**Built with ❤️ using React, Tailwind CSS, and Shopify Storefront API**
