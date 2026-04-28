import { shopifyClient } from "@/lib/shopify";
import { ScrollReveal } from "../ScrollReveal";
import { useState, useEffect } from "react";
import { CartDrawer, CartItemType } from "./CartDrawer";

import phoenixGold from "@/assets/phoenix-gold.jpg";
import phoenixSilver from "@/assets/phoenix-silver.jpg";

const ProductShowcase = ({ 
  onOpenAuth, 
  isCartOpen, 
  setIsCartOpen 
}: { 
  onOpenAuth: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
}) => {
  const [selected, setSelected] = useState<"gold" | "silver">("gold");
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem("aaruke_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [liveProduct, setLiveProduct] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    localStorage.setItem("aaruke_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchShopifyData = async () => {
      try {
        const product = await shopifyClient.product.fetchByHandle('phoenix-necklace');
        setLiveProduct(product);
      } catch (error) {
        console.error("Failed to fetch live product data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchShopifyData();
  }, []);

  // 1. ADD TO CART - Auth requirement removed! Anyone can add to cart now.
  const handleAddToCart = () => {
    if (!liveProduct) {
      alert("Product data is still loading from Shopify. Give it one more second!");
      return;
    } 
    
    try {
      const selectedVariant = liveProduct.variants.find(
        (variant: any) => variant.title.toLowerCase().includes(selected)
      ) || liveProduct.variants[0];

      const rawPrice = selectedVariant.price?.amount || selectedVariant.priceV2?.amount || selectedVariant.price || "3499";

      const newItem: CartItemType = {
        id: selectedVariant.id,
        title: liveProduct.title,
        variantTitle: selectedVariant.title,
        price: rawPrice,
        image: selected === "gold" ? phoenixGold : phoenixSilver,
        quantity: 1
      };

      setCartItems(prev => {
        const existing = prev.find(item => item.id === newItem.id);
        if (existing) {
          return prev.map(item => item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, newItem];
      });
      
      // Open the cart drawer immediately
      setIsCartOpen(true);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  // 2. CHECKOUT - Auth requirement added here instead!
  const handleFinalCheckout = async () => {
    const token = localStorage.getItem("aaruke_token");

    // If they aren't logged in, pop open the Auth modal over the cart!
    if (!token) {
      onOpenAuth(); 
      return; 
    }

    setIsProcessing(true);
    try {
      const checkout = await shopifyClient.checkout.create();
      
      const lineItemsToAdd = cartItems.map(item => ({
        variantId: item.id,
        quantity: item.quantity
      }));

      const updatedCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
      
      window.location.href = updatedCheckout.webUrl;
    } catch (error) {
      console.error("Shopify Checkout Error:", error);
      alert("Checkout is currently unavailable. Please try again later.");
      setIsProcessing(false);
    }
  };

  return (
    <section id="product" className="py-24 md:py-36 px-6 bg-[#050707] text-ivory">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          
          <div className="space-y-6">
            <ScrollReveal direction="left">
              <div className="relative border border-white/5 bg-[#0a0c0c] p-1">
                <div className="absolute top-6 right-0 bg-[#e65100] text-white text-[10px] tracking-widest uppercase py-1.5 px-4 z-20">
                  Founder Edition
                </div>
                
                <img
                  src={selected === "gold" ? phoenixGold : phoenixSilver}
                  alt="Phoenix Necklace"
                  className="w-full aspect-[3/4] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                
                <div className="absolute bottom-10 left-0 w-full text-center">
                   <p className="text-[10px] tracking-[0.3em] uppercase text-gold/60 font-sans">
                     {selected} Variant — Symbolic Phoenix Pendant
                   </p>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setSelected("gold")} 
                className={`py-4 text-[10px] tracking-widest uppercase border transition-all ${selected === "gold" ? "border-gold text-gold bg-gold/5" : "border-white/5 text-muted-foreground"}`}
              >
                Gold Phoenix
              </button>
              <button 
                onClick={() => setSelected("silver")} 
                className={`py-4 text-[10px] tracking-widest uppercase border transition-all ${selected === "silver" ? "border-gold text-gold bg-gold/5" : "border-white/5 text-muted-foreground"}`}
              >
                Silver Phoenix
              </button>
            </div>
          </div>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex flex-col h-full pt-4">
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold mb-4 font-sans">Aaruké · Founder Edition</span>
              
              <h2 className="font-serif text-5xl md:text-6xl font-light mb-4 italic">Phoenix Necklace</h2>
              
              <p className="font-serif text-gold/70 italic text-lg mb-5">Rise · Transform · Become</p>

              <p className="font-serif text-base md:text-lg font-light mb-4 italic">Crafted for everyday elegance and statement moments, the Phoenix pendant blends minimal luxury with deep meaning—designed to be worn close, always.</p>

              <ul className="space-y-4 mb-12 font-sans text-sm text-ivory/60 font-light border-y border-white/5 py-8">
                <li className="flex items-center gap-4">— <span className="tracking-wide">Material: Premium brass base with 22kt gold plating / high-polish silver finish</span></li>
                <li className="flex items-center gap-4">— <span className="tracking-wide">Plating Durability: Up to 18 months with proper care</span></li>
                <li className="flex items-center gap-4">— <span className="tracking-wide">Finish: Anti-tarnish coated for longer-lasting shine</span></li>
                <li className="flex items-center gap-4">— <span className="tracking-wide">Skin Safety: Hypoallergenic & skin-friendly</span></li>
                <li className="flex items-center gap-4">— <span className="tracking-wide">Weight: 3 grams</span></li>
              </ul>

              <div className="mb-8">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-sans text-4xl text-gold font-medium tracking-tight">
                    ₹{Math.floor(Number(liveProduct?.variants?.[0]?.price?.amount || 3499)).toLocaleString('en-IN')}
                  </span>
                  <span className="text-muted-foreground line-through text-sm font-sans">₹8,499</span>
                </div>
                <p className="text-[10px] tracking-widest text-orange-500 uppercase font-medium">
                  🔥 Founder Pricing · First 50 Pieces Only
                </p>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={isProcessing}
                  className="w-full bg-[#c5a059] text-black py-5 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#d4af37] transition-all active:scale-[0.98]"
                >
                  Add to Cart
                </button>
                
                <button onClick={() => { window.location.href = "#meaning"}} className="w-full border border-white/10 py-5 text-[10px] tracking-[0.3em] uppercase hover:bg-white/5 transition-all">
                  Read the Meaning
                </button>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        subtotal={`₹${cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0).toLocaleString('en-IN')}`}
        onUpdateQuantity={(id, q) => {
          if (q < 1) return;
          setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: q} : i));
        }}
        onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
        onCheckout={handleFinalCheckout} 
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default ProductShowcase;