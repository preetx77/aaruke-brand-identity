import Nav from "@/components/sections/NavBar";
import Hero from "@/components/sections/HeroSection";
import BrandStory from "@/components/sections/BrandStory";
import PackagingExperience from "@/components/sections/PackagingExperience";
import Meaning from "@/components/sections/Meaning";
import QualityCare from "@/components/sections/QualityCare";
import AboutAaruke from "@/components/sections/AboutAaruke";
import Articles from "@/components/sections/Articles";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Footer from "@/components/sections/Footer";
import EarlyAccess from "@/components/sections/EarlyAccess";
import WhyDifferent from "@/components/sections/WhyDifferent";  
import AuthPage from "@/components/sections/AuthPage";
import { ContactModal } from "@/components/sections/ContactModal"; 
import { useState, useEffect } from "react";

/* ─── PAGE ─── */
const Index = () => {
  // --- DEVELOPMENT PASSWORD GATE STATE ---
  const [isUnlocked, setIsUnlocked] = useState(() => {
    // Safely check localStorage (prevents SSR errors if using frameworks like Next.js)
    if (typeof window !== "undefined") {
      return localStorage.getItem("aaruke_dev_unlocked") === "true";
    }
    return false;
  });
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);

  // --- STANDARD PAGE STATE ---
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");

  console.log("The current view is:", currentView);

  // --- PASSWORD VERIFICATION HANDLER ---
  const handleVerify = (e) => {
    e.preventDefault();
    // This matches the password from your Shopify settings screenshot
    if (inputPassword === "Aaruke@6499") {
      if (typeof window !== "undefined") {
        localStorage.setItem("aaruke_dev_unlocked", "true");
      }
      setIsUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // --- RENDER LOCK SCREEN IF NOT UNLOCKED ---
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 bg-[#0a0c0c] text-ivory flex flex-col items-center justify-center px-6 z-[9999]">
        <div className="max-w-md w-full text-center space-y-8">
          <h1 className="font-serif text-3xl text-[#c5a059] uppercase tracking-[0.15em]">Aaruké</h1>
          <p className="font-serif italic text-white/70">We are currently crafting the Aaruké experience. Check back soon.</p>
          
          <form onSubmit={handleVerify} className="space-y-4 pt-4">
            <input 
              type="password" 
              placeholder="Enter password" 
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c5a059] rounded-sm text-center transition-colors"
            />
            {error && <p className="text-red-400 text-xs">Incorrect password. Please try again.</p>}
            <button 
              type="submit" 
              className="w-full bg-[#c5a059] text-black py-3 text-xs tracking-widest uppercase font-bold hover:bg-[#d4af37] transition-all rounded-sm"
            >
              Enter Store
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER FULL STORE IF UNLOCKED ---
  return (
    <>
      <Nav 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenContact={() => setIsContactOpen(true)}
        onNavigate={(view) => setCurrentView(view)}
      />
      
      <main>
        {currentView === "home" ? (
          
          // --- HOME PAGE CONTENT ---
          <>
            <Hero />
            <BrandStory />
            <ProductShowcase 
              onOpenAuth={() => setIsAuthOpen(true)} 
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
            />
            <Meaning />
            <PackagingExperience />
            <QualityCare />
            <AboutAaruke />
            <WhyDifferent />
          </>

        ) : (

          // --- ARTICLES PAGE CONTENT ---
          <div className="pt-24 min-h-screen bg-[#233f2d]"> 
            <Articles />
          </div>

        )}
      </main> 

      {isAuthOpen && (
        <AuthPage onClose={() => setIsAuthOpen(false)} />
      )}

      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      <Footer onOpenContact={() => setIsContactOpen(true)} />
    </>
  );
};

export default Index;