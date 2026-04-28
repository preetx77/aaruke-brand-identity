import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";

interface NavProps {
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
}

const Nav = ({ onOpenCart, onOpenAuth, onOpenContact }: NavProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("aaruke_token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    window.addEventListener("auth_change", checkLoginStatus);
    return () => window.removeEventListener("auth_change", checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aaruke_token");
    window.dispatchEvent(new Event("auth_change")); 
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 py-3 md:py-5 backdrop-blur-md border-b border-white/10">
        {/* Added 'relative' here so the absolutely positioned logo stays contained */}
        <div className="w-full relative flex items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          
          {/* LEFT SIDE: Hamburger Menu (Now visible on ALL screens) */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white/70 hover:text-[#c5a059] transition-colors"
              aria-label="Open Menu"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>
          </div>

          {/* CENTER: Brand Logo (Absolutely centered on ALL screens) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <a 
              href="/" 
              className="font-serif italic font-light text-[1.15rem] md:text-[1.25rem] text-ivory uppercase no-underline tracking-tight" 
              style={{ fontWeight: 200, color: "var(--ivory)", textDecoration: "none", textTransform: "uppercase" }}
            >
              Aar<span style={{ color: "#c5a059" }}>u</span>ké
            </a>
          </div>

          {/* RIGHT SIDE: Links, Auth, and Cart */}
          <div className="flex items-center gap-5 md:gap-6">
            
            {/* Desktop-only Shop Link */}
            <a href="#product" className="hidden md:block font-sans text-[10px] md:text-xs tracking-widest uppercase text-[#c5a059] hover:text-white transition-colors">
              Shop Phoenix
            </a>

            {/* Authentication Button */}
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="text-white/70 hover:text-[#c5a059] transition-colors flex items-center justify-center"
                aria-label="Sign Out"
              >
                <span className="hidden md:block font-sans text-[10px] md:text-xs tracking-widest uppercase">Sign Out</span>
                <User className="w-5 h-5 md:hidden" strokeWidth={1.5} />
              </button>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="text-white/70 hover:text-[#c5a059] transition-colors flex items-center justify-center"
                aria-label="Sign In"
              >
                <span className="hidden md:block font-sans text-[10px] md:text-xs tracking-widest uppercase">Sign In</span>
                <User className="w-5 h-5 md:hidden" strokeWidth={1.5} />
              </button>
            )}

            {/* Divider Line */}
            <div className="h-4 w-[1px] bg-white/20"></div>

            {/* Permanent Cart Icon */}
            <button 
              onClick={onOpenCart}
              className="flex items-center justify-center text-white/70 hover:text-[#c5a059] transition-all hover:scale-110 active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
          </div>
        </div>
      </nav>

      {/* --- MOBILE/SIDE MENU DRAWER --- */}
      <div 
        className={`fixed inset-0 z-[120] transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-[#050707]/80 backdrop-blur-sm" 
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <div 
          className={`absolute top-0 left-0 w-72 md:w-80 h-full bg-[#0a0c0c] border-r border-white/10 p-8 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="absolute top-6 right-6 text-white/40 hover:text-[#c5a059] transition-colors"
          >
            <X strokeWidth={1.5} className="w-6 h-6" />
          </button>

          <div className="mb-16 mt-4">
            <span className="font-serif italic font-light text-[1.75rem] text-ivory uppercase no-underline tracking-tight" style={{ fontWeight: 200, color: "var(--ivory)", textDecoration: "none", textTransform: "uppercase" }}>
              Aar<span className="text-[#c5a059]">u</span>ké
            </span>
          </div>

          <div className="flex flex-col space-y-8 flex-grow">
            <a 
              href="#product" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-[#c5a059] hover:text-white transition-colors"
            >
              Shop Phoenix
            </a>
            <a 
              href="#meaning" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/70 hover:text-[#c5a059] transition-colors"
            >
              Read The Meaning
            </a>
            
          </div>

          <div className="mt-auto pt-8 border-t border-white/10 flex flex-col items-start">
             <button 
               onClick={() => {
                 setIsMobileMenuOpen(false);
                 onOpenContact();
               }}
               className="text-[10px] tracking-widest text-white/40 hover:text-white uppercase transition-colors"
             >
               Contact Support
             </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;