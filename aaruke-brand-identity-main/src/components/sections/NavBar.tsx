import { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, User } from "lucide-react";

const NavBar = ({ onOpenCart, onOpenAuth, onOpenContact, onNavigate }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <nav className="fixed top-0 left-0 right-0 z-50 py-4 md:py-5 backdrop-blur-md border-b border-white/10">
        <div className="w-full grid grid-cols-3 items-center px-4 max-w-7xl mx-auto">
          
          {/* LEFT SIDE: Hamburger OR Desktop Logo */}
          <div className="flex items-center justify-start">
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white/70 hover:text-[#c5a059] transition-colors"
              aria-label="Open Menu"
            >
              <Menu strokeWidth={1.5} className="w-6 h-6" />
            </button>

            {/* Desktop Logo -> RESTORED: Opens the menu */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="hidden md:block font-serif font-semibold text-[1.25rem] text-[#c5a059] hover:text-white transition-colors uppercase tracking-[0.15em]"
            >
              Aaruké
            </button>
          </div>

          {/* CENTER: Mobile Logo -> Navigates Home */}
          <div className="flex items-center justify-center">
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate("home");
              }} 
              className="md:hidden font-serif font-semibold text-[1.15rem] text-[#c5a059] uppercase no-underline tracking-[0.15em]" 
            >
              Aaruké
            </button>
          </div>

          {/* RIGHT SIDE: Links, Auth, and Cart */}
          <div className="flex items-center justify-end gap-5 md:gap-6">
            
            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#product" className="text-xs tracking-[0.2em] uppercase text-white/80 hover:text-[#c5a059] transition-colors">
              Shop Phoenix
              </a>
            </div>

            {/* Authentication Button */}
            {isLoggedIn ? (
              <button 
                onClick={handleLogout}
                className="text-white/70 hover:text-[#c5a059] transition-colors flex items-center justify-center"
              >
                <span className="hidden md:block font-sans text-xs tracking-widest uppercase">Sign Out</span>
                <User className="w-5 h-5 md:hidden" strokeWidth={1.5} />
              </button>
            ) : (
              <button 
                onClick={onOpenAuth}
                className="text-white/70 hover:text-[#c5a059] transition-colors flex items-center justify-center"
              >
                <span className="hidden md:block font-sans text-xs tracking-widest uppercase">Sign In</span>
                <User className="w-5 h-5 md:hidden" strokeWidth={1.5} />
              </button>
            )}

            <div className="h-4 w-[1px] bg-white/20"></div>

            <button 
              onClick={onOpenCart}
              className="flex items-center justify-center text-white/70 hover:text-[#c5a059] transition-all hover:scale-110 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
          </div>
        </div>
      </nav>

      {/* --- SIDE MENU DRAWER --- */}
      <div 
        className={`fixed inset-0 z-[120] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className="absolute inset-0 bg-[#050707]/80 backdrop-blur-sm" 
          onClick={() => setIsMenuOpen(false)}
        ></div>

        <div 
          className={`absolute top-0 left-0 w-72 md:w-80 h-full bg-[#0a0c0c] border-r border-white/10 p-8 transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button 
            onClick={() => setIsMenuOpen(false)} 
            className="absolute top-6 right-6 text-white/40 hover:text-[#c5a059] transition-colors"
          >
            <X strokeWidth={1.5} className="w-6 h-6" />
          </button>

          <div className="mb-16 mt-4">
            <span 
              className="font-serif text-[1.75rem] text-[#c5a059] uppercase tracking-[0.15em] font-medium" 
            >
              Aaruké
            </span>
          </div>

          <div className="flex flex-col space-y-8 flex-grow items-start">
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate("home");
              }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 hover:text-[#c5a059] transition-colors"
            >
              Shop Phoenix
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate("home");
                setTimeout(() => document.getElementById('meaning')?.scrollIntoView({ behavior: 'smooth' }), 100);
              }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 hover:text-[#c5a059] transition-colors"
            >
              Read The Meaning
            </button>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                onNavigate("articles");
                window.scrollTo(0, 0); 
              }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-white/80 hover:text-[#c5a059] transition-colors"
            >
              Articles
            </button>
          </div>

          <div className="mt-auto pt-8 border-t border-white/10 flex flex-col items-start">
             <button 
               onClick={() => {
                 setIsMenuOpen(false);
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

export default NavBar;