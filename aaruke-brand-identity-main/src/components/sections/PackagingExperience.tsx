import { ScrollReveal } from "../ScrollReveal";
// TODO: Import your actual image here
// import packagingImg from "@/assets/packaging.jpg"; 

const PackagingExperience = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#0a0c0c] overflow-hidden flex items-center min-h-screen">
      
      {/* 1. Ambient Background Glow (Deep Green) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#1b3325]/30 rounded-full blur-[150px] pointer-events-none" />
      
      {/* 2. Oversized Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-white/[0.02] whitespace-nowrap pointer-events-none select-none tracking-tighter">
        Experience
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
          
          {/* Left Column: Text (5 Columns) */}
          <div className="md:col-span-5 md:col-start-1 space-y-10">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#c5a059]/50" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#c5a059]">The Details</span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                An Intentional Experience
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="space-y-6 font-sans text-white/70 font-light leading-relaxed text-base md:text-lg">
                <p>
                  Every Aaruke piece arrives carefully packaged in our signature magnetic closure box, created to make the experience feel personal from the moment it arrives.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="space-y-4 pt-4">
                <p className="text-[10px] tracking-widest uppercase text-white/50 font-medium">Inside every order:</p>
                <ul className="space-y-3 font-sans text-white/70 font-light text-sm md:text-base">
                  <li className="flex items-center gap-4">
                    <span className="w-1 h-1 bg-[#c5a059] rounded-full shrink-0"></span>
                    Phoenix meaning card
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-1 h-1 bg-[#c5a059] rounded-full shrink-0"></span>
                    Thank you note
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="w-1 h-1 bg-[#c5a059] rounded-full shrink-0"></span>
                    Jewelry Care Card
                  </li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <p className="font-serif italic text-xl md:text-2xl text-white/90 pt-6 border-l pl-6 border-[#c5a059]/30">
                Designed to be kept, not discarded.
              </p>
            </ScrollReveal>
          </div>

          {/* Right Column: Image (4 Columns, Pushed to right edge) */}
          <div className="md:col-span-4 md:col-start-9 w-3/4 mx-auto md:w-full relative mt-12 md:mt-0">
            <ScrollReveal direction="right" delay={0.4}>
              
              <div className="absolute -inset-4 border border-white/5 z-0 hidden md:block translate-x-5 -translate-y-5" />
              
              <div className="relative z-10 w-full aspect-[3/4] bg-[#111313] overflow-hidden">
                <img
                  src="https://plus.unsplash.com/premium_photo-1732449368194-655ad29627db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxsZXJ5JTIwcGFja2FnaW5nfGVufDB8fDB8fHww" 
                  alt="Aaruké Packaging Experience"
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

export default PackagingExperience;