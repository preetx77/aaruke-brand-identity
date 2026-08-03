import { ScrollReveal } from "../ScrollReveal";

function Meaning() {
  const blocks = [
    { title:"Strength After Struggle", text:"The phoenix is not born in comfort. It is born in collapse. Every phoenix necklace carries the memory of fire — and the courage to rise from it." },
    { title:"Rising Into Power",       text:"This rebirth necklace is for those in the act of becoming. Not looking back. Not standing still. Rising — deliberately, powerfully, visibly." },
    { title:"Jewellery as Identity",   text:"Phoenix jewellery India — meaningful, intentional, designed not to impress others but to remind yourself who you truly are." },
  ];
  return (
    <section id="meaning" style={{ background:"linear-gradient(to bottom, #060908, var(--green-mid) 40%, #060908)", padding:"9rem 2rem", position:"relative", zIndex:1 }}>
      <div className="meaning-inner" style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>
        <ScrollReveal>
        <div >
          <p style={{ fontFamily:"var(--sans)", fontSize:"0.65rem", letterSpacing:"0.35em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"1.2rem" }}>The <span style={{color:"#c9a74a" }}>Meaning</span></p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.8rem,4vw,3rem)", fontWeight:300, color:"var(--ivory)", lineHeight:1.2, marginBottom:"1.5rem" }}>
            The Phoenix Necklace —<br /><span style={{ fontStyle:"italic", color:"#c9a74a" , fontWeight:"600" }}>What It Carries</span>
          </h2>
          
          <p style={{fontWeight:"600", fontFamily:"var(--serif)", fontSize:"1.05rem", fontStyle:"italic", color:"var(--ivory-dim)", lineHeight:1.85 }}>
            Across every culture that has known fire, the phoenix has carried the same truth: what breaks you does not end you. It remakes you. This is not jewellery. This is a declaration.
          </p>
        </div>
        </ScrollReveal>
        <div className="reveal" style={{ display:"flex", flexDirection:"column", gap:"2rem" }}>
          {blocks.map((b , i) => (
            <ScrollReveal key={b.title} delay={0.08 * i}>
            <div key={b.title} style={{ paddingLeft:"1.5rem", borderLeft:"1px solid rgba(201,168,76,0.3)",color:"#c9a74a"  }}>
              <h3 style={{ fontFamily:"var(--sans)", fontSize:"1.2rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"var(--gold)", marginBottom:"0.4rem" }}>{b.title}</h3>
              <p style={{fontWeight:"600", fontFamily:"var(--serif)", fontStyle:"italic", color:"var(--ivory-dim)", fontSize:"1rem", lineHeight:1.7 }}>{b.text}</p>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Meaning;