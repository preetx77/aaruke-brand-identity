import { ScrollReveal } from "../ScrollReveal";
// TODO: Import your actual image here
// import aboutImg from "@/assets/about-aaruke.jpg"; 

const AboutAaruke = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#0a0c0c] overflow-hidden flex items-center min-h-screen">
      
      {/* 1. Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#1f3d2b]/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* 2. Oversized Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-white/[0.02] whitespace-nowrap pointer-events-none select-none tracking-tighter">
        Aaruké
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
          
          {/* Left Column: Text (Kept at 5 columns) */}
          <div className="md:col-span-5 md:col-start-1 space-y-10">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#c5a059]/50" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#c5a059]">The Vision</span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                About Aaruke
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="space-y-6 font-sans text-white/70 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Aaruke is a symbolic jewellery brand inspired by spirit animals and personal transformation.
                </p>
                <p>
                  Each piece is designed to represent identity, growth, and the phases that shape who we become.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-serif italic text-xl md:text-2xl text-white/90 pt-4 border-l pl-6 border-[#c5a059]/30">
                This is jewellery created with meaning — not trends.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Image (Shrunk to 4 columns, pushed right, scaled down on mobile) */}
          <div className="md:col-span-4 md:col-start-9 w-3/4 mx-auto md:w-full relative mt-12 md:mt-0">
            <ScrollReveal direction="right" delay={0.4}>
              
              {/* Offset Decorative Frame (Adjusted to match smaller image) */}
              <div className="absolute -inset-4 border border-white/5 z-0 hidden md:block translate-x-5 -translate-y-5" />
              
              {/* Premium 3:4 Image Mask */}
              <div className="relative z-10 w-full aspect-[3/4] bg-[#111313] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop" 
                  alt="About Aaruké Jewellery"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
                />
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutAaruke;