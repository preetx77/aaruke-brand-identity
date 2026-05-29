import { ScrollReveal } from "../ScrollReveal";
import BorderGlow from '../BorderGlow';

const BrandStory = () => (
  <section className="py-16 md:py-32 px-4 md:px-6">
    <div className="max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <p className="tracking-luxury uppercase text-[10px] md:text-xs font-sans text-gold mb-4 md:mb-6">
          The Aaruke Philosophy
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="font-serif text-3xl md:text-5xl font-light mb-8 leading-[1.2] md:leading-[1.1] text-ivory">
          More Than Jewellery. A Symbolic Becoming.
        </h2>
      </ScrollReveal>
    </div>

    <ScrollReveal delay={0.2}>
      {/* Changed to grid-cols-1 on mobile, grid-cols-3 on desktop. Adjusted gap dynamically. */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-8 md:mt-12">
        
        {/* Card 1: The Phoenix */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#182A22"
          borderRadius={23}
          glowRadius={42}
          glowIntensity={3}
          coneSpread={29}
          animated={false}
          colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
        >
          <div className="w-full h-full flex items-center justify-center text-center p-6 font-sans text-base md:text-lg text-muted-foreground leading-relaxed font-light min-h-[120px] md:min-h-[150px] bg-[#182A22] rounded-[22px]">
            The Phoenix represents transformation.
          </div>
        </BorderGlow>

        {/* Card 2: For those who have rebuilt */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#182A22"
          borderRadius={23}
          glowRadius={42}
          glowIntensity={3}
          coneSpread={29}
          animated={false}
          colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
        >
          <div className="w-full h-full flex items-center justify-center text-center p-6 font-sans text-base md:text-lg text-muted-foreground leading-relaxed font-light min-h-[120px] md:min-h-[150px] bg-[#182A22] rounded-[22px]">
            For those who have rebuilt themselves, outgrown old versions, and stepped into something stronger.
          </div>
        </BorderGlow>

        {/* Card 3: This piece was created */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#182A22"
          borderRadius={23}
          glowRadius={42}
          glowIntensity={3}
          coneSpread={29}
          animated={false}
          colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
        >
          <div className="w-full h-full flex items-center justify-center text-center p-6 font-sans text-base md:text-lg text-muted-foreground leading-relaxed font-light min-h-[120px] md:min-h-[150px] bg-[#182A22] rounded-[22px]">
            This piece was created as a reminder — of growth, resilience, and everything you’ve risen from.
          </div>
        </BorderGlow>

        {/* Row 2: Full Width Quote (Changed to col-span-1 on mobile, col-span-3 on desktop) */}
        <div className="col-span-1 md:col-span-3">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#182A22"
            borderRadius={23}
            glowRadius={42}
            glowIntensity={3}
            coneSpread={29}
            animated={false}
            colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
          >
            <div className="w-full flex items-center justify-center text-center p-6 md:p-8 font-serif text-lg md:text-xl min-h-[90px] md:min-h-[100px] bg-[#182A22] rounded-[22px]">
              “What tried to break you, rebuilt you”
            </div>
          </BorderGlow>
        </div>
        
      </div>
    </ScrollReveal>
  </section>
);

export default BrandStory;