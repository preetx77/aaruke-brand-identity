import { ScrollReveal } from "../ScrollReveal";

const philosophyLines = [
  {
    label: "The symbol",
    text: "The Phoenix represents transformation.",
  },
  {
    label: "The person",
    text: "For those who have rebuilt themselves, outgrown old versions, and stepped into something stronger.",
  },
  {
    label: "The intention",
    text: "This piece was created as a reminder — of growth, resilience, and everything you've risen from.",
  },
];

const BrandStory = () => (
  <section className="py-16 md:py-32 px-4 md:px-6">
    <div className="max-w-2xl mx-auto">

      {/* Eyebrow + Headline */}
      <div className="mb-5 md:mb-14">
        <ScrollReveal>
          <p className="tracking-luxury uppercase text-[10px] md:text-xs font-sans text-gold mb-4 md:mb-6">
            The Aaruke Philosophy
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-serif text-3xl md:text-5xl font-light leading-[1.15] text-ivory">
            More Than Jewellery.<br />A Symbolic Becoming.
          </h2>
        </ScrollReveal>
      </div>


      {/* Philosophy narrative rail */}
      <ScrollReveal delay={0.2}>
        <div
          className="mb-10 md:mb-12 flex flex-col"
          style={{ borderLeft: "1px solid rgba(201, 169, 110, 0.3)", paddingLeft: "24px" }}
        >
          {philosophyLines.map((line, i) => (
            <div
              key={i}
              className="relative py-5"
              style={{
                borderBottom:
                  i < philosophyLines.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              {/* Gold dot on the rail */}
              <span
                className="absolute bg-gold rounded-full opacity-60"
                style={{ left: "-28px", top: "26px", width: "6px", height: "6px" }}
              />

              {/* Label */}
              <p
                className="font-sans uppercase text-gold mb-2"
                style={{ fontSize: "10px", letterSpacing: "0.18em", opacity: 0.7 }}
              >
                {line.label}
              </p>

              {/* Text */}
              <p className="font-serif text-xl md:text-2xl font-light italic leading-relaxed text-muted-foreground">
                {line.text}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Quote block */}
      <ScrollReveal delay={0.3}>
        <div
          className="rounded-[14px] px-8 py-7 text-center"
          style={{
            background: "rgba(201, 169, 110, 0.07)",
            border: "1px solid rgba(201, 169, 110, 0.18)",
          }}
        >
          <span
            className="block font-serif font-light italic text-gold opacity-40"
            style={{ fontSize: "48px", lineHeight: "0.5", marginBottom: "12px" }}
          >
            "
          </span>
          <p className="font-serif text-xl md:text-2xl font-light italic text-ivory leading-snug tracking-wide">
            What tried to break you, rebuilt you
          </p>
        </div>
      </ScrollReveal>

    </div>
  </section>
);

export default BrandStory;