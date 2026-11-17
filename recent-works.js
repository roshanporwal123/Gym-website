(function () {
  const section = document.querySelector("#recent-works");
  if (!section) return;

  const cards = gsap.utils.toArray(".rw-card", section);
  const stack = section.querySelector(".rw-stack");
  const n = cards.length;
  const GAP = 22;

  // Shuru ki stack position
  cards.forEach((card, i) => {
    gsap.set(card, {
      y: -i * GAP,
      scale: 1 - i * 0.04,
      zIndex: n - i,
      rotation: 0,
      opacity: 1,
    });
  });

  const tilt = (i) => (i % 2 === 0 ? -1 : 1) * (6 + i * 2);

  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 0.5 });

  // 1) Ek ke baad ek niche girein
  tl.to(cards, {
    y: () => section.offsetHeight * 0.9,
    rotation: (i) => tilt(i),
    opacity: 0,
    duration: 0.9,
    ease: "power2.in",
    stagger: 0.35,
  });

  // 2) Phir wapas stack me aayein
  tl.to(
    cards,
    {
      y: (i) => -i * GAP,
      rotation: 0,
      opacity: 1,
      duration: 0.9,
      ease: "back.out(1.4)",
      stagger: { each: 0.3, from: "end" },
    },
    "+=0.4"
  );

  // Section screen par ho tabhi chale, bahar jaane par pause
  new IntersectionObserver(
    ([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()),
    { threshold: 0.2 }
  ).observe(section);

  // 3) Mouse move par 3D tilt (sirf is section me)
  const rotX = gsap.quickTo(stack, "rotationX", { duration: 0.6, ease: "power3" });
  const rotY = gsap.quickTo(stack, "rotationY", { duration: 0.6, ease: "power3" });

  section.addEventListener("mousemove", (e) => {
    const r = section.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    rotY(x * 12);
    rotX(-y * 12);
  });

  section.addEventListener("mouseleave", () => {
    rotX(0);
    rotY(0);
  });
})();