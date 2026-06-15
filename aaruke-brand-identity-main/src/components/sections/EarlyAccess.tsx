import { useState } from "react";
import { ScrollReveal } from "../ScrollReveal";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  return (
    <section className="py-24 md:py-36 px-6 bg-charcoal" style={{ background:"radial-gradient(ellipse at 50% 30%, #1d3522 0%, #0a1310 50%, #060908 100%)", padding:"11rem 2rem", textAlign:"center", position:"relative", zIndex:1 }}>
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="tracking-luxury uppercase text-xs font-sans text-gold mb-6">The First of Many</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-serif text-6xl md:text-7xl font-light mb-6 leading-[1.1] text-ivory" style={{fontStyle:"italic"}}>
            The <span className="text-gold">Phoenix</span> rises first
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-sans text-muted-foreground font-light leading-relaxed max-w-xl mx-auto text-m md:text-l" style={{fontStyle:"italic" , color:"var(--ivory-dim)", marginBottom:"2.5rem" , marginTop:"1.75rem"}}>
            This is the beginning of the Aaruke spirit animal Collection
            <span style={{display:"block"}}> Limited Founder pieces</span>
            <span> be the first to know when the next chapter awakens</span>
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row sm:gap-2 max-w-md mx-auto gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className=" w-full sm:flex-1 bg-transparent border border-foreground/15 px-5 py-4 font-sans text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
              required
            />
            <button type="submit" className=" w-full sm:w-auto bg-accent text-accent-foreground px-6 py-4 font-sans text-xs tracking-luxury uppercase font-medium transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--gold)/0.3)] active:scale-[0.97] whitespace-nowrap">
              Get Early Access
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
};


export default Newsletter;