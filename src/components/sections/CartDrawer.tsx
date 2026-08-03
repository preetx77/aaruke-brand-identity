import { X, ShoppingBag, ArrowRight, Plus, Minus, Trash2 } from "lucide-react";

// NEW: We define exactly what a "Cart Item" looks like
export interface CartItemType {
  id: string; // The unique Shopify Variant ID
  title: string;
  variantTitle: string;
  price: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  isProcessing: boolean;
  cartItems: CartItemType[]; // Now it accepts an ARRAY of items
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  subtotal: string;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  onCheckout, 
  isProcessing,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  subtotal
}: CartDrawerProps) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-charcoal border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-serif text-2xl text-ivory flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-gold" />
            Your Cart
          </h2>
          <button onClick={onClose} className="p-2 text-muted-foreground hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Body - Now Loops Through All Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted-foreground mt-10 font-sans">
              Your cart is empty.
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-lg relative">
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
                
                <div className="flex flex-col justify-between flex-1 pr-6">
                  <div>
                    <h3 className="text-ivory font-serif text-lg leading-tight">{item.title}</h3>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider font-sans mt-1">
                      {item.variantTitle}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-gold font-sans font-medium tracking-tight">₹{Math.floor(Number(item.price || 0)).toLocaleString('en-IN')}</p>
                    
                    <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-md px-2 py-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="text-muted-foreground hover:text-white transition-colors p-1"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-ivory font-sans text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="text-muted-foreground hover:text-white transition-colors p-1"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-black/20">
          <div className="flex justify-between text-ivory mb-6 font-serif text-lg">
            <span>Subtotal</span>
            <span className="font-mono tracking-tight">{subtotal}</span> 
          </div>
          
          <button 
            onClick={onCheckout}
            disabled={isProcessing || cartItems.length === 0}
            className="group flex items-center justify-center gap-3 bg-gold text-black px-8 py-4 font-sans text-sm tracking-luxury uppercase font-bold transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)] active:scale-[0.98] w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Connecting to Secure Checkout..." : "Proceed to Payment"}
            {!isProcessing && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;