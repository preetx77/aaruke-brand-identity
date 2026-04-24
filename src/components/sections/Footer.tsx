import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faPinterest, faXTwitter } from '@fortawesome/free-brands-svg-icons'; 



<div>
  <h3 className="text-xl font-serif text-gold mb-4">Socials</h3>
  <div className="flex flex-col space-y-3">
    
    <a href="#" className="group flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300">
      <FontAwesomeIcon icon={faInstagram} className="text-lg transition-transform duration-300 group-hover:scale-110" />
      <span>Instagram</span>
    </a>

    <a href="#" className="group flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300">
      <FontAwesomeIcon icon={faPinterest} className="text-lg transition-transform duration-300 group-hover:scale-110" />
      <span>Pinterest</span>
    </a>

    <a href="#" className="group flex items-center gap-3 text-muted-foreground hover:text-gold transition-colors duration-300">
      <FontAwesomeIcon icon={faXTwitter} className="text-lg transition-transform duration-300 group-hover:scale-110" />
      <span>Twitter</span>
    </a>

  </div>
</div>




const Footer = () => {
  const [footerEmail, setFooterEmail] = useState("");
  return (
    <footer id="signup" className="border-t border-foreground/6 py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="font-serif text-2xl text-ivory mb-3" style={{fontFamily:"italic" , fontWeight:"100"}}>Aarukè</h3>
            <p className="font-sans text-sm text-muted-foreground font-light leading-relaxed">
              India's first spirit animal jewellery house. Each piece is a symbol. Each symbol, a story of becoming.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-sans text-xs tracking-luxury uppercase text-gold mb-4">Philosophy</h4>
            <ul className=" flex flex-row flex-wrap justify-center gap-x-6 gap-y-4 md:flex-col md:items-start text-sm font-light text-ivory/60">
              <li>Spirit Animal Mission</li>
              <li>Symbolic Craftsmanship</li>
              <li>Limited Editions</li>
              <li>Meaningful Gifting</li>
            </ul>
          </div>

          <div className="font-serif text-2xl text-ivory mb-3 text-center md:text-left" >
            Socials
            <div className="flex flex-row justify-center md:justify-start mt-4 gap-6">
                <ul className="flex flex-row gap-6">
                <li><a href="#" className="font-sans text-4xl text-muted-foreground/50 hover:text-gold transition-colors"><FontAwesomeIcon icon={faInstagram} /></a></li>
                <li><a href="#" className="font-sans text-4xl text-muted-foreground/50 hover:text-gold transition-colors"> <FontAwesomeIcon icon={faPinterest} /></a></li>
                </ul>
            
          </div>
          </div>

        </div>
        <div className="border-t border-foreground/6 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs text-muted-foreground/50">© 2026 Aaruke. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;