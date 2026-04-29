import { ScrollReveal } from "../ScrollReveal";
import Phoenix from "@/assets/Phoenix.svg";
import Lion from "@/assets/Lion.svg";
import Owl from "@/assets/Owl.svg";
import Crab from "@/assets/Crab.svg";


const spiritAnimals = [
  {
    id: "phoenix",
    title: "The Phoenix",
    description: "For those who have been through fire and emerged transformed.",
    image: Phoenix, 
    status: "available",
    link: "#product",
  },
  {
    id: "lion",
    title: "The Lion",
    description: "For those who carry quiet strength and lead with unwavering courage.",
    image: Lion,
    status: "coming_soon",
  },
  {
    id: "owl",
    title: "The Owl",
    description: "For those who see beyond the surface and move in silent wisdom.",
    image: Owl,
    status: "coming_soon",
  },
  {
    id: "crab",
    title: "The Crab",
    description: "For those who protect their depths and move forward in their own time.",
    image: Crab,
    status: "coming_soon",
  },
];

export const SpiritUniverse = () => (
  <section className="py-12 md:py-24 px-6 bg-charcoal" style ={{paddingTop:"10rem"}}>
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-7">
        <ScrollReveal>
          <p className="tracking-luxury uppercase text-xs font-sans text-gold mb-6">The Aaruke Spirit Animal Universe</p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-6 leading-[1.1] text-ivory" style = {{fontStyle:"italic" , fontSize:"2.5rem" , fontWeight:"400"}}>
            Jewellery That Chooses you !
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="font-sans text-muted-foreground max-w-xl mx-auto font-light leading-relaxed">
            We craft Symbolic Identities where each creature reflects a deeper emotional and spiritual connection -- helping you express who you are , beyond the surface .
          </p>
        </ScrollReveal>
      </div>

      <section id="collection" className="w-full mx-auto py-8 md:py-12">
  <div className="w-full px-4 md:px-6 lg:px-6">

    {/* FIXED 1: Restored the Grid Layout! (2 columns mobile, 4 columns desktop) */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full">
      {spiritAnimals.map((item, index) => (
        <ScrollReveal key={item.id} delay={index * 0.15}>
          
          <div 
            className={`flex flex-col h-full rounded-2xl overflow-hidden bg-black/40 border transition-all duration-500 group ${
              item.status === "available" 
                ? "border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.05)] opacity-100 hover:shadow-[0_0_100px_rgba(212,175,55,0.2)]" 
                : "bg-[#050707] border border-white/5 opacity-40 cursor-not-allowed"
            }`}
          >
           
            <div className="aspect-[4/5] w-full overflow-hidden relative shrink-0">
              <div className="absolute inset-0 bg-black/20 transition-colors duration-500 z-10" />
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transform transition-transform duration-1000 ease-out"
                loading="lazy"
              />
            </div>

            
            <div className="flex flex-col flex-1 p-3 md:p-6 items-center text-center">
              <div className="mb-4 w-full">
                <h3 className="font-serif text-lg md:text-2xl text-ivory tracking-wide mb-1 md:mb-2">
                  {item.title}
                </h3>
                {/* PRO-TIP: Added 'line-clamp-3' so if a description is too long, it adds '...' instead of breaking the box */}
                <p className="font-sans text-[10px] md:text-xs text-muted-foreground leading-relaxed max-w-[220px] mx-auto font-light line-clamp-3 md:line-clamp-none">
                  {item.description}
                </p>
              </div>

              {/* FIXED 4: Added 'mt-auto' to push the button to the absolute bottom of the card */}
              <div className="mt-auto w-full pt-2">
                <button  
                  onClick={() => {
                    if(item.link){
                      window.location.href = item.link;
                    }
                  }}
                  
                  className={`w-full py-2.5 px-2 font-sans text-[10px] tracking-luxury uppercase transition-all duration-300 rounded-[12px] ${
                    item.status === "available"
                      ? "bg-ivory text-black hover:bg-gold hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-[0.98] font-medium"
                      : "bg-transparent text-muted-foreground border border-white/10 cursor-not-allowed"
                  }`}
                >
                  {item.status === "available" ? (
                   <>Available<br />Now</>
                    ): (<>Coming<br />Soon</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
    
  </div>
</section>
    </div>
  </section>
);

export default SpiritUniverse;