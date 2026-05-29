import { ScrollReveal } from "../ScrollReveal";
// TODO: Import your actual image here
// import qualityImg from "@/assets/quality-care.jpg"; 

const QualityAndCare = () => {
  return (
    <section className="relative py-32 md:py-48 px-6 bg-[#0a0c0c] overflow-hidden flex items-center min-h-screen">
      
      {/* 1. Ambient Background Glow (Warm tone for Quality section) */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059]/10 rounded-full blur-[150px] pointer-events-none" />
      
      {/* 2. Oversized Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif text-white/[0.02] whitespace-nowrap pointer-events-none select-none tracking-tighter">
        Quality
      </div>

      <div className="max-w-[1200px] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 items-center">
          
          {/* Left Column: Image (4 Columns, Pushed slightly off edge) */}
          <div className="md:col-span-4 md:col-start-2 w-3/4 mx-auto md:w-full relative mb-12 md:mb-0 order-2 md:order-1">
            <ScrollReveal direction="left" delay={0.2}>
              
              <div className="absolute -inset-4 border border-white/5 z-0 hidden md:block -translate-x-5 -translate-y-5" />
              
              <div className="relative z-10 w-full aspect-[3/4] bg-[#111313] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Quality and Care view"
                  className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s] ease-out"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Text (5 Columns) */}
          <div className="md:col-span-5 md:col-start-8 space-y-10 order-1 md:order-2">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#c5a059]/50" />
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#c5a059]">The Craft</span>
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight">
                Designed to Stay with You.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6 font-sans text-white/70 font-light leading-relaxed text-base md:text-lg">
                <p>
                  The Phoenix necklace is thoughtfully designed by Aaruke founder Ruchira and crafted in premium-grade brass with rich 18kt gold plating for a refined, lasting finish.
                </p>
                <p>
                  To enhance durability and longevity, each piece is finished with an additional palladium protective coating and undergoes multiple quality checks before reaching you.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="font-serif italic text-xl md:text-2xl text-white/90 py-4 border-l pl-6 border-[#c5a059]/30">
                Created for mindful everyday wear — with care, intention, and meaning in every detail.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="space-y-4 pt-2">
                <p className="text-[10px] tracking-widest uppercase text-white/50 font-medium">To preserve its finish:</p>
                <ul className="space-y-3 font-sans text-white/70 font-light text-sm md:text-base">
                  <li className="flex items-start gap-4">
                    <span className="w-1 h-1 mt-2.5 bg-[#c5a059] rounded-full shrink-0"></span>
                    <span>Avoid water, perfume, and harsh chemicals</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1 h-1 mt-2.5 bg-[#c5a059] rounded-full shrink-0"></span>
                    <span>Store in the provided pouch</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-1 h-1 mt-2.5 bg-[#c5a059] rounded-full shrink-0"></span>
                    <span>Handle with care and intention</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QualityAndCare;