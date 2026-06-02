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

  // 🔴 DIAGNOSTIC CHECK: This will prove if your .env variables are actually loading
  console.log("=== NETWORK DIAGNOSTICS ===");
  console.log("1. Store Domain:", import.meta.env.VITE_SHOPIFY_STORE_DOMAIN);
  console.log("2. Public Token:", import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN);
  console.log("3. Shopify Client Config:", shopifyClient.config);
  console.log("===========================");

  const [selected, setSelected] = useState<"gold" | "silver">("gold");
  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    const saved = localStorage.getItem("aaruke_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [isProcessing, setIsProcessing] = useState(false);
  
  const [liveProduct, setLiveProduct] = useState<any>({ title: "Aaruké Test Product" });
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    localStorage.setItem("aaruke_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchShopifyData = async () => {
      try {
        const product = await shopifyClient.product.fetchByHandle('test-product');
        if (product) setLiveProduct(product);
      } catch (error) {
        console.error("Failed to fetch live product data:", error);
      } finally {
        setIsLoadingData(false);
      }
    };
    fetchShopifyData();
  }, []);

  const getSelectedVariant = () => {
    if (!liveProduct || !liveProduct.variants) return null;
    
    const searchString = selected === "gold" ? "gold-plated" : "silver-plated";
    
    return liveProduct.variants.find((v: any) => v.title.toLowerCase() === searchString) 
           || liveProduct.variants.find((v: any) => v.title.toLowerCase().includes(selected)) 
           || liveProduct.variants[selected === "gold" ? 0 : 1];
  };

  const handleAddToCart = () => {
    const matchedVariant = getSelectedVariant();

    if (!matchedVariant) {
      alert("Product data is still loading from Shopify. Give it one more second!");
      return;
    } 
    
    try {
      const rawPrice = matchedVariant.price?.amount || matchedVariant.priceV2?.amount || matchedVariant.price || "10.00";

      const newItem: CartItemType = {
        id: matchedVariant.id, 
        title: liveProduct?.title || "Aaruké Test Product",
        variantTitle: matchedVariant.title,
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
      
      setIsCartOpen(true);
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  const handleBuyNow = async () => {
    const matchedVariant = getSelectedVariant();

    if (!matchedVariant) {
      alert("Product data is still loading from Shopify. Give it one more second!");
      return;
    }

    setIsProcessing(true);

    try {
      const checkout = await shopifyClient.checkout.create();
      const lineItemsToAdd = [
        {
          variantId: matchedVariant.id,
          quantity: 1
        }
      ];

      const updatedCheckout = await shopifyClient.checkout.addLineItems(checkout.id, lineItemsToAdd);
      window.location.href = updatedCheckout.webUrl;
      
    } catch (error) {
      console.error("Shopify Buy Now Error:", error);
      alert("Checkout is currently unavailable. Please try again later.");
      setIsProcessing(false);
    }
  };

  const handleFinalCheckout = async () => {
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

  const currentVariant = getSelectedVariant();
  const displayPrice = currentVariant?.price?.amount || currentVariant?.priceV2?.amount || currentVariant?.price || "10.00";

  return (
    <section id="product" className="py-24 md:py-36 px-6 bg-[#0a0c0c] text-ivory min-h-screen flex items-center">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-start">
          
          <div className="md:hidden flex flex-col pt-4">
            <ScrollReveal>
              <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4 block font-sans">
                First Release · Limited Pieces
              </span>
              <h2 className="font-serif text-4xl font-light mb-2 text-white">The Phoenix Necklace</h2>
              <p className="font-serif text-muted-foreground italic text-base mb-6">Rise · Transform · Become</p>
              <p className="font-serif text-sm text-ivory/80 italic mb-2">
                A personal symbol designed to stay with you through phases of transformation.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal direction="left">
              <div className="relative rounded-2xl overflow-hidden bg-[#111313] aspect-[4/5]">
                <div className="absolute top-6 right-0 bg-[#c5a059] text-black text-[9px] font-bold tracking-widest uppercase py-2 px-4 z-20 rounded-l-sm">
                  Founder Edition
                </div>
                <img
                  src={selected === "gold" ? phoenixGold : phoenixSilver}
                  alt={`Phoenix Necklace in ${selected}`}
                  className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 px-4 md:px-12">
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1c1c] border border-white/10 cursor-pointer">
                  <img src={selected === "gold" ? phoenixGold : phoenixSilver} alt="Thumbnail 1" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1c1c] border border-white/5 cursor-pointer">
                   <img src={selected === "gold" ? phoenixGold : phoenixSilver} alt="Thumbnail 2" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1a1c1c] border border-white/5 cursor-pointer">
                   <img src={selected === "gold" ? phoenixGold : phoenixSilver} alt="Thumbnail 3" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="flex flex-col h-full pt-4 md:pt-10">
              
              <div className="hidden md:block">
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4 block font-sans">
                  First Release · Limited Pieces
                </span>
                <h2 className="font-serif text-4xl md:text-5xl font-light mb-2 text-white">The Phoenix Necklace</h2>
                <p className="font-serif text-muted-foreground italic text-base mb-8">Rise · Transform · Become</p>
                <p className="font-serif text-sm md:text-base text-ivory/80 italic mb-8">
                  A personal symbol designed to stay with you through phases of transformation.
                </p>
              </div>

              <hr className="border-white/5 mb-8 mt-4 md:mt-0" />

              <div className="mb-8">
                <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-4 block font-sans">
                  Select Variant
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setSelected("gold")} 
                    className={`py-4 px-4 flex items-center justify-center gap-3 text-xs tracking-widest uppercase border transition-all rounded-sm ${selected === "gold" ? "border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5" : "border-white/10 text-muted-foreground hover:border-white/30"}`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#c5a059]"></span>
                    Gold Phoenix
                  </button>
                  <button 
                    onClick={() => setSelected("silver")} 
                    className={`py-4 px-4 flex items-center justify-center gap-3 text-xs tracking-widest uppercase border transition-all rounded-sm ${selected === "silver" ? "border-[#c5a059] text-[#c5a059] bg-[#c5a059]/5" : "border-white/10 text-muted-foreground hover:border-white/30"}`}
                  >
                    <span className="w-3 h-3 rounded-full bg-[#e2e8f0]"></span>
                    Silver Phoenix
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-10">
                <div className="border border-white/5 bg-white/[0.02] p-4 flex gap-3 items-center rounded-sm">
                  <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground mb-0.5">Plating Life</p>
                    <p className="text-[10px] text-ivory/90">Up to 18 months with care</p>
                  </div>
                </div>
                
                <div className="border border-white/5 bg-white/[0.02] p-4 flex gap-3 items-center rounded-sm">
                  <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground mb-0.5">Finish</p>
                    <p className="text-[10px] text-ivory/90">Anti-tarnish coated</p>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.02] p-4 flex gap-3 items-center rounded-sm">
                  <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground mb-0.5">Skin Safety</p>
                    <p className="text-[10px] text-ivory/90">Hypoallergenic & skin-friendly</p>
                  </div>
                </div>

                <div className="border border-white/5 bg-white/[0.02] p-4 flex gap-3 items-center rounded-sm">
                  <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-muted-foreground mb-0.5">Weight</p>
                    <p className="text-[10px] text-ivory/90">3 grams</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <span className="font-serif text-4xl text-white font-light tracking-tight">
                  ₹{Math.floor(Number(displayPrice)).toLocaleString('en-IN')}
                </span>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex gap-4">
                  <button 
                    onClick={handleBuyNow}
                    disabled={isProcessing}
                    className="flex-1 bg-[#c5a059] text-black py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#d4af37] transition-all rounded-sm shadow-[0_0_15px_rgba(197,160,89,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Processing...' : 'Buy Now'}
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    disabled={isProcessing}
                    className="flex-1 border border-[#c5a059] text-[#c5a059] py-4 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#c5a059]/10 transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <button onClick={() => { window.location.href = "#meaning"}} className="w-full border border-white/10 bg-[#0a0c0c] py-4 text-[9px] tracking-[0.3em] uppercase hover:bg-white/5 transition-all text-muted-foreground rounded-sm">
                  Read the Meaning
                </button>
              </div>

              <div className="flex justify-between items-center text-[8px] tracking-widest uppercase text-muted-foreground/60 border-t border-white/5 pt-6 mt-4">
                <span>Carefully packed</span>
                <span>Secure Checkout</span>
                <span>Limited First Drop</span>
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