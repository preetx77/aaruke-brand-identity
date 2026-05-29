//we removed the WhyDifferent section from the Index page, but we can keep the component in case we want to use it later or in a different context.

import { ScrollReveal } from "../ScrollReveal";

function WhyDifferent() {
  const items = [
    { icon:"🇮🇳",   title:"Born in India",       text:"India's emerging spirit animal jewelry brand. Rooted in symbolism, built for now." },
    { icon:"✦",   title:"Meaning-Driven",      text:"Every piece carries intention. Premium necklace for women who know exactly who they are." },
    { icon:"◈",   title:"Limited Batches",     text:"Luxury symbolic necklace craftsmanship. Never mass produced. Always intentional." },
    { icon:"∞",   title:"A Living Collection", text:"Each drop is a new chapter. Spiritual jewelry India — built for those who are becoming." },
  ];
  return (
    <section id="why" style={{ background:"linear-gradient(135deg, var(--green) 20%, var(--charcoal) 100%)", padding:"9rem 2rem", textAlign:"center", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <ScrollReveal>
        <div >
          <p className="text-gold" style={{ fontFamily:"var(--sans)", fontSize:"0.65rem", letterSpacing:"0.35em", textTransform:"uppercase", marginBottom:"1.2rem" }}>Why Aaruke</p>
          <h2 className="text-6xl md:text-2xl font-light mb-5 leading-[1.1]" style={{ fontFamily:"var(--serif)", fontSize:"clamp(3rem,2vw,1.25rem)", fontWeight:300, color:"var(--ivory)", maxWidth:400, margin:"0 auto 3.5rem", lineHeight:1.2 }}>
            Designed for <em  className="text-gold " style={{ fontStyle:"italic"}}>Identity</em>.<br />Not Trends.
          </h2>
        </div>
        </ScrollReveal>
          
           <div className="why-grid-inner" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1px", maxWidth:900, margin:"0 auto 4rem", background:"rgba(201,168,76,0.1)" }}>
           {items.map((i, index) => (
            <ScrollReveal key={index}>
             <div key={i.title} className="why-item" style={{ background:"var(--charcoal)", padding:"2.5rem 1.5rem", textAlign:"center" }}>
              <span style={{ fontSize:"1.5rem", marginBottom:"1rem", display:"block" }}>{i.icon}</span>
              <h3 style={{ fontFamily:"var(--sans)", fontSize:"0.7rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.5rem" }}>{i.title}</h3>
              <p style={{ fontFamily:"var(--serif)", fontStyle:"italic", fontSize:"0.88rem", color:"var(--ivory-dim)", lineHeight:1.6 }}>{i.text}</p>
            </div>
            
            </ScrollReveal>
             
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyDifferent;