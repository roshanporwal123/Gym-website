const items = gsap.utils.toArray(".zoom-item");

const total = 8;                    // ek image ka cycle (seconds)
const gap = total / items.length;   // images ke beech gap

items.forEach((el, i) => {
  gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.5, opacity: 0 });

  const tl = gsap.timeline({
    repeat: -1,
    delay: i * gap,
    onUpdate: () => {
      el.style.zIndex = Math.round(gsap.getProperty(el, "scale") * 100);
    },
  });

  tl
    // 1) Center me small appear (jaldi fully visible)
    .fromTo(el,
      { scale: 0.5, opacity: 0 },
      { scale: 0.8, opacity: 1, duration: total * 0.2, ease: "power2.out" })
    // 2) Thodi der clear dikhe
    .to(el, { scale: 1, duration: total * 0.25, ease: "none" })
    // 3) Large hoke fade out
    .to(el, { scale: 3.5, opacity: 0, duration: total * 0.55, ease: "power2.in" });
});