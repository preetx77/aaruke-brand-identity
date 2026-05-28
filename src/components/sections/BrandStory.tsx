import { ScrollReveal } from "../ScrollReveal";
import BorderGlow from '../BorderGlow';

const BrandStory = () => (
  <section className="py-24 md:py-32 px-6">
    <div className="max-w-3xl mx-auto text-center">
      <ScrollReveal>
        <p className="tracking-luxury uppercase text-xs font-sans text-gold mb-6">The Aaruke Philosophy</p>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="font-serif text-4xl md:text-5xl font-light mb-8 leading-[1.1] text-ivory">
          More Than Jewellery. A Symbolic Becoming.
        </h2>
      </ScrollReveal>

      </div>
      <ScrollReveal delay={0.2}>
  {/* Parent Grid (Removed grid-rows-2 so it handles dynamic item heights cleanly) */}
  <div className="grid grid-cols-3 gap-8 mt-12">
    
    {/* Card 1: The Phoenix */}
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="182A22"
      borderRadius={23}
      glowRadius={42}
      glowIntensity={3}
      coneSpread={29}
      animated={false}
      colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
    >
      <div className="w-full h-full flex items-center justify-center text-center p-6 font-sans md:text-lg text-muted-foreground leading-relaxed font-light min-h-[150px]">
        The Phoenix represents transformation.
      </div>
    </BorderGlow>

    {/* Card 2: For those who have rebuilt */}
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="182A22"
      borderRadius={23}
      glowRadius={42}
      glowIntensity={3}
      coneSpread={29}
      animated={false}
      colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
    >
      <div className="w-full h-full flex items-center justify-center text-center p-6 font-sans md:text-lg text-muted-foreground leading-relaxed font-light min-h-[150px]">
        For those who have rebuilt themselves, outgrown old versions, and stepped into something stronger.
      </div>
    </BorderGlow>

    {/* Card 3: This piece was created */}
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="182A22"
      borderRadius={23}
      glowRadius={42}
      glowIntensity={3}
      coneSpread={29}
      animated={false}
      colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
    >
      <div className="w-full h-full flex items-center justify-center text-center p-6 font-sans md:text-lg text-muted-foreground leading-relaxed font-light min-h-[150px]">
        This piece was created as a reminder — of growth, resilience, and everything you’ve risen from.
      </div>
    </BorderGlow>

    {/* Row 2: Full Width Quote (Wrapped in a div to handle the col-span-3 alignment perfectly) */}
    <div className="col-span-3">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="40 80 80"
        backgroundColor="182A22"
        borderRadius={23}
        glowRadius={42}
        glowIntensity={3}
        coneSpread={29}
        animated={false}
        colors={['#ffffff', '#cbd5e1', '#ffffff', '#94a3b8']}
      >
        <div className="w-full flex items-center justify-center text-center p-8 font-serif text-xl min-h-[100px]">
          “What tried to break you, rebuilt you”
        </div>
      </BorderGlow>
    </div>
    
  </div>
</ScrollReveal>
      {/* <ScrollReveal delay={0.3}>
        <div className="w-16 h-px bg-gold/40 mx-auto" />
      </ScrollReveal> */}
    
  </section>
);

export default BrandStory;