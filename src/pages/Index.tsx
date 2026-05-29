import Nav from "@/components/sections/NavBar";
import Hero from "@/components/sections/HeroSection";
import BrandStory from "@/components/sections/BrandStory";
import PackagingExperience from "@/components/sections/PackagingExperience";
import SpiritUniverse from "@/components/sections/SpiritUniverse";
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
import { useState } from "react";



/* ─── PAGE ─── */
const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  // 1. ADDED: State to control which "page" is visible (defaults to "home")
  const [currentView, setCurrentView] = useState("home");

  console.log("The current view is:", currentView);

  return (
    <>
      <Nav 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenContact={() => setIsContactOpen(true)}
        // 2. ADDED: Pass the navigation function to the NavBar
        onNavigate={(view) => setCurrentView(view)}
      />
      
      <main>
        {/* 3. ADDED: Conditional Rendering Logic */}
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
            <SpiritUniverse />
            <PackagingExperience />
            <QualityCare />
            <AboutAaruke />
            <WhyDifferent />
          </>

        ) : (

          // --- ARTICLES PAGE CONTENT ---
          <div className="pt-24 min-h-screen bg-[#233f2d]"> 
            {/* We add padding-top (pt-24) so the fixed NavBar doesn't cover the top of the articles */}
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