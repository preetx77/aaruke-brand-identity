import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'; 

// 1. Properly define the prop types
interface FooterProps {
  onOpenContact: () => void;
}

const Footer = ({ onOpenContact }: FooterProps) => {
  return (
    <footer id="signup" className="border-t border-foreground/6 py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4 text-center md:text-left">
            <span className="font-serif italic font-light text-[1.75rem] text-ivory uppercase no-underline tracking-tight" style={{ fontWeight: 200, color: "var(--ivory)", textDecoration: "none", textTransform: "uppercase" }}>
              Aar<span className="text-[#c5a059]">u</span>ké
            </span>
            <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
              India's first spirit animal jewellery house. Each piece is a symbol. Each symbol, a story of becoming.
            </p>
          </div>
          
          {/* Philosophy Section */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#c5a059] mb-4">Philosophy</h4>
            <ul className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-4 md:flex-col md:items-start text-sm font-light text-ivory/60">
              <li><a href="#mission" className="hover:text-white transition-colors">Spirit Animal Mission</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Symbolic Craftsmanship</a></li>
              <li><a href="#editions" className="hover:text-white transition-colors">Limited Editions</a></li>
              <li><a href="#gifting" className="hover:text-white transition-colors">Meaningful Gifting</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#c5a059] mb-4">Contact</h4>
            <button 
              onClick={onOpenContact} 
              className="text-white/60 hover:text-[#c5a059] transition-colors text-sm font-sans"
            >
              Send us an inquiry
            </button>
          </div>

          {/* Socials Section */}
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-[#c5a059] mb-4">Socials</h4>
            <div className="flex flex-row justify-center md:justify-start mt-4 gap-6">
              <a href="#" className="group text-muted-foreground/50 hover:text-[#c5a059] transition-colors duration-300">
                <FontAwesomeIcon icon={faInstagram} className="text-3xl transition-transform duration-300 group-hover:scale-110" />
              </a>
              <a href="#" className="group text-muted-foreground/50 hover:text-[#c5a059] transition-colors duration-300">
                <FontAwesomeIcon icon={faPinterest} className="text-3xl transition-transform duration-300 group-hover:scale-110" />
              </a>
            </div>
          </div>

        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-foreground/6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/50">© 2026 Aarukè. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;