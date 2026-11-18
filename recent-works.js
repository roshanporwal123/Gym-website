// (function () {
//   const section = document.querySelector("#recent-works");
//   if (!section) return;

//   const cards = gsap.utils.toArray(".rw-card", section);
//   const stack = section.querySelector(".rw-stack");
//   const n = cards.length;
//   const GAP = 22;

  // Shuru ki stack position
  // cards.forEach((card, i) => {
  //   gsap.set(card, {
  //     y: -i * GAP,
  //     scale: 1 - i * 0.04,
  //     zIndex: n - i,
  //     rotation: 0,
  //     opacity: 1,
  //   });
  // });

  // const tilt = (i) => (i % 2 === 0 ? -1 : 1) * (6 + i * 2);

  // const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 0.5 });

  // 1) Ek ke baad ek niche girein
  // tl.to(cards, {
  //   y: () => section.offsetHeight * 0.9,
  //   rotation: (i) => tilt(i),
  //   opacity: 0,
  //   duration: 0.9,
  //   ease: "power2.in",
  //   stagger: 0.35,
  // });

  // 2) Phir wapas stack me aayein
  // tl.to(
  //   cards,
  //   {
  //     y: (i) => -i * GAP,
  //     rotation: 0,
  //     opacity: 1,
  //     duration: 0.9,
  //     ease: "back.out(1.4)",
  //     stagger: { each: 0.3, from: "end" },
  //   },
  //   "+=0.4"
  // );

  // Section screen par ho tabhi chale, bahar jaane par pause
  // new IntersectionObserver(
  //   ([entry]) => (entry.isIntersecting ? tl.play() : tl.pause()),
  //   { threshold: 0.2 }
  // ).observe(section);

  // 3) Mouse move par 3D tilt (sirf is section me)
//   const rotX = gsap.quickTo(stack, "rotationX", { duration: 0.6, ease: "power3" });
//   const rotY = gsap.quickTo(stack, "rotationY", { duration: 0.6, ease: "power3" });

//   section.addEventListener("mousemove", (e) => {
//     const r = section.getBoundingClientRect();
//     const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
//     const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
//     rotY(x * 12);
//     rotX(-y * 12);
//   });

//   section.addEventListener("mouseleave", () => {
//     rotX(0);
//     rotY(0);
//   });
// })();

(function () {
  const section = document.querySelector("#recent-works");
  if (!section || typeof gsap === "undefined") return;

  const cards = gsap.utils.toArray(".rw-card", section);
  const stack = section.querySelector(".rw-stack");
  const n = cards.length;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let tl = null;
  let inView = true;
  let lastW = 0;
  let lastH = 0;

  // Gap stack ki height ke hisaab se (desktop 300px -> ~22px)
  function getConfig() {
    const w = window.innerWidth;
    const gap = Math.max(7, Math.round(stack.offsetHeight * 0.073));
    let step = 0.04;
    let tiltBase = 6;
    if (w <= 340) { step = 0.025; tiltBase = 3; }
    else if (w <= 400) { step = 0.028; tiltBase = 4; }
    else if (w <= 480) { step = 0.03; tiltBase = 4; }
    else if (w <= 768) { step = 0.035; tiltBase = 5; }
    else if (w <= 1024) { step = 0.038; tiltBase = 6; }
    return { gap, step, tiltBase };
  }

  function build() {
    if (tl) tl.kill();
    gsap.killTweensOf(cards);

    const { gap, step, tiltBase } = getConfig();
    const tilt = (i) => (i % 2 === 0 ? -1 : 1) * (tiltBase + i * 1.5);

    // Stack upar ki taraf grow hota hai, isliye poore stack ko neeche shift karke center karo
    gsap.set(stack, { y: ((n - 1) * gap) / 2 });

    // Shuru ki stack position
    cards.forEach((card, i) => {
      gsap.set(card, {
        y: -i * gap,
        scale: 1 - i * step,
        zIndex: n - i,
        rotation: 0,
        opacity: 1,
      });
    });

    if (reduceMotion) return; // animation nahi, sirf static stack

    tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.6,
      delay: 0.5,
      paused: !inView,
    });

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
        y: (i) => -i * gap,
        rotation: 0,
        opacity: 1,
        duration: 0.9,
        ease: "back.out(1.4)",
        stagger: { each: 0.3, from: "end" },
      },
      "+=0.4"
    );
  }

  build();

  // Section screen par ho tabhi chale
  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (!tl) return;
      inView ? tl.play() : tl.pause();
    },
    { threshold: 0.2 }
  ).observe(section);

  // Resize / rotate par dobara build.
  // Mobile pe scroll karte waqt address bar se sirf height badalti hai, isliye
  // width ya bada height change hone par hi rebuild karte hain.
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === lastW && Math.abs(h - lastH) < 120) return;
      lastW = w;
      lastH = h;
      build();
    }, 200);
  }
  lastW = window.innerWidth;
  lastH = window.innerHeight;
  window.addEventListener("resize", onResize);
  window.addEventListener("orientationchange", () => setTimeout(build, 300));

  // 3) Mouse tilt - sirf mouse wale devices pe (touch pe skip)
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canHover && !reduceMotion) {
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
  }
})();