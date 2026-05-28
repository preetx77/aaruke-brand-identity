import { ScrollReveal } from "../ScrollReveal";
import { ArrowRight , Diamond} from "lucide-react";
import phoenixHero from "@assets/phoenix-background.png";
import { EmberParticles } from "../EmberParticles";


const Hero = () => (
  <section className=" h-[100dvh] bg-[#050707]relative min-h-screen flex items-center justify-center overflow-hidden h-[60vh] md:h-screen">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={phoenixHero} className="w-full h-full object-contain object-top md:object-hidden opacity-[.55]" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 " />
    </div>

    <EmberParticles />

    <div className="relative z-10 max-w-3xl mx-auto text-center px-10 md:px-14 pt-24 pb-16">
      <ScrollReveal>
        <p className="tracking-luxury uppercase text-[0.8rem] font-sans mb-5 mt-8 font-light ">
          Spirit Animal Jewellery
        </p>
      </ScrollReveal>


      {/* font-serif text-5xl sm:text-6xl md:text-7xl font-light leading-[0.95] mb-6 text-ivory */}
      <ScrollReveal delay={0.15}>
        <h1 className="font-serif text-3xl sm:text-6xl md:text-7xl font-light leading-[0.95] mb-6 text-ivory">
          <span className="block text-4xl sm:text-5xl md:text-6xl text-ivory">
            Phoenix Necklace
          </span>
          <span className="block text-4xl sm:text-5xl md:text-6xl text-ivory mt-1 md:mt-2">
            Symbol of <span className="italic text-gold">Rebirth</span>
            </span>
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.25}>
        <p className="text-wrap font-serif block text-xl md:text-xl text-ivory max-w-xl mx-auto mb-5 font-light leading-relaxed mx-20"> A symbolic pendant inspired by transformation,resilience, and the quiet strength of becoming</p>
      </ScrollReveal>

      <ScrollReveal delay={0.3}>
        <p className="font-sans text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 font-light leading-relaxed">
          The first chapter of Aaruke's Spirit Animal Collection.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.45}>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <a href="#product" className="group inline-flex items-center gap-3 bg-accent text-accent-foreground px-8 py-4 font-sans text-sm tracking-luxury uppercase font-medium transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--gold)/0.3)] active:scale-[0.97]">
            Own Your Rise
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#meaning" className="meaning inline-flex items-center gap-2 border border-foreground/20 px-8 py-4 font-sans text-sm tracking-luxury uppercase font-light text-foreground transition-all duration-300 hover:border-gold hover:text-gold active:scale-[0.97]">
            Discover the Meaning
          </a>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Hero;