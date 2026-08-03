const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${10 + Math.random() * 80}%`,
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 3}s`,
  size: 2 + Math.random() * 3,
}));

export const EmberParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
    {particles.map((p) => (
      <div
        key={p.id}
        className="absolute rounded-full ember-particle"
        style={{
          left: p.left,
          bottom: "10%",
          width: p.size,
          height: p.size,
          background: `radial-gradient(circle, hsl(var(--gold)), hsl(var(--ember) / 0.6))`,
          animationDelay: p.delay,
          animationDuration: p.duration,
        }}
      />
    ))}
  </div>
);
