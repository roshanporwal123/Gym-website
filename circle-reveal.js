// gsap.registerPlugin(ScrollTrigger);

// const crCards = gsap.utils.toArray(".cr-card");
// const crTotal = crCards.length;

// const crRadius = () => Math.min(window.innerWidth, window.innerHeight) * 0.38;

// shuru mein sab center mein, main image ke peeche
// crCards.forEach((card, i) => {
//   gsap.set(card, {
//     xPercent: -50,
//     yPercent: -50,
//     x: i * 2,
//     y: i * 2,
//     scale: 0.8,
//     rotation: 0,
//     zIndex: crTotal - i,
//   });
// });

// 1) Ring ki infinite rotation (pehle paused, cards aane ke baad start hogi)
// const crSpin = gsap.to(".cr-ring", {
//   rotation: 360,
//   duration: 10, // kam = tez, zyada = slow
//   ease: "none",
//   repeat: -1,
//   paused: true,
// });

// 2) AUTO timeline: scrub/pin hata diya, ab khud chalegi
// const crTl = gsap.timeline({
//   paused: true,
//   onComplete: () => crSpin.play(), // cards nikalne ke baad ring ghoomna shuru
// });

// crTl.to(crCards, {
//   x: (i) => Math.cos((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
//   y: (i) => Math.sin((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
//   scale: 1,
//   ease: "power3.out",
//   duration: 0.9,
//   stagger: 0.2, // ek ek image 0.3s ke gap se aayegi
// });

// main image thodi chhoti
// crTl.to(".cr-main", { scale: 0.85, duration: 1, ease: "power2.inOut" }, "<");

// 3) Jab section screen par dikhe tab ek baar auto-play karo
// ScrollTrigger.create({
//   trigger: ".cr-stage",
//   start: "top 60%",
//   once: true,
//   onEnter: () => crTl.play(),
// });

// 4) Ring ghoomne par images ulti na hon, isliye counter-rotate
// gsap.ticker.add(() => {
//   const r = gsap.getProperty(".cr-ring", "rotation");
//   gsap.set(crCards, { rotation: -r });
// });

gsap.registerPlugin(ScrollTrigger);

const crStage = document.querySelector(".cr-stage");
const crCards = gsap.utils.toArray(".cr-card");
const crTotal = crCards.length;

// Stage + card size ke hisaab se safe radius
const crRadius = () => {
  const w = crStage.offsetWidth;
  const h = crStage.offsetHeight;
  const cardW = crCards[0].offsetWidth;
  const cardH = crCards[0].offsetHeight;

  // card ka aadha size minus, taaki screen se bahar na jaye
  const maxX = w / 2 - cardW / 2 - 8;
  const maxY = h / 2 - cardH / 2 - 8;
  return Math.max(60, Math.min(maxX, maxY, Math.min(w, h) * 0.38));
};

// shuru mein sab center mein, main image ke peeche
crCards.forEach((card, i) => {
  gsap.set(card, {
    xPercent: -50,
    yPercent: -50,
    x: i * 2,
    y: i * 2,
    scale: 0.8,
    rotation: 0,
    zIndex: crTotal - i,
  });
});

// 1) Ring ki infinite rotation
const crSpin = gsap.to(".cr-ring", {
  rotation: 360,
  duration: 10,
  ease: "none",
  repeat: -1,
  paused: true,
});

// 2) Auto timeline
const crTl = gsap.timeline({
  paused: true,
  onComplete: () => {
    crOpened = true;
    crSpin.play();
  },
});

let crOpened = false;

crTl.to(crCards, {
  x: (i) => Math.cos((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
  y: (i) => Math.sin((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
  scale: 1,
  ease: "power3.out",
  duration: 0.9,
  stagger: 0.2,
});

crTl.to(".cr-main", { scale: 0.85, duration: 1, ease: "power2.inOut" }, "<");

// 3) Section dikhe tab ek baar play
ScrollTrigger.create({
  trigger: ".cr-stage",
  start: "top 60%",
  once: true,
  onEnter: () => crTl.play(),
});

// 4) Counter-rotate taaki images seedhi rahein
gsap.ticker.add(() => {
  const r = gsap.getProperty(".cr-ring", "rotation");
  gsap.set(crCards, { rotation: -r });
});

// 5) Resize / mobile rotate pe radius dobara set karo
let crResizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(crResizeTimer);
  crResizeTimer = setTimeout(() => {
    if (crOpened) {
      // animation khatam ho chuki hai to cards ko naye radius pe le jao
      crCards.forEach((card, i) => {
        gsap.to(card, {
          x: Math.cos((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
          y: Math.sin((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    }
    ScrollTrigger.refresh();
  }, 200);
});