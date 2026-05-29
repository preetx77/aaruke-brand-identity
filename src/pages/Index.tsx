import Nav from "@/components/sections/NavBar";
import Hero from "@/components/sections/HeroSection";
import BrandStory from "@/components/sections/BrandStory";
import PackagingExperience from "@/components/sections/PackagingExperience";
import SpiritUniverse from "@/components/sections/SpiritUniverse";
import Meaning from "@/components/sections/Meaning";
import QualityCare from "@/components/sections/QualityCare";
import AboutAaruke from "@/components/sections/AboutAaruke";
import ProductShowcase from "@/components/sections/ProductShowcase";
import Footer from "@/components/sections/Footer";
import { Ear } from "lucide-react"; // Assuming you still need this for something
import EarlyAccess from "@/components/sections/EarlyAccess";
import WhyDifferent from "@/components/sections/WhyDifferent";  
import AuthPage from "@/components/sections/AuthPage";
import { ContactModal } from "@/components/sections/ContactModal"; // Make sure this path matches where you saved it!
import { useState } from "react";

/* ─── PAGE ─── */
const Index = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 1. Add the state for the Contact Modal
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Nav 
        onOpenAuth={() => setIsAuthOpen(true)} 
        onOpenCart={() => setIsCartOpen(true)} 
        // 2. Pass the trigger to your NavBar
        onOpenContact={() => setIsContactOpen(true)}
      />
      
      <main>
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

      </main> 

      {isAuthOpen && (
        <AuthPage onClose={() => setIsAuthOpen(false)} />
      )}

      {/* 3. Drop the Contact Modal here */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />

      {/* 4. Pass the trigger to your Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />
    </>
  );
};

export default Index;