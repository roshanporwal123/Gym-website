gsap.registerPlugin(ScrollTrigger);

const crCards = gsap.utils.toArray(".cr-card");
const crTotal = crCards.length;

const crRadius = () => Math.min(window.innerWidth, window.innerHeight) * 0.38;

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

// 1) Ring ki infinite rotation (pehle paused, cards aane ke baad start hogi)
const crSpin = gsap.to(".cr-ring", {
  rotation: 360,
  duration: 10, // kam = tez, zyada = slow
  ease: "none",
  repeat: -1,
  paused: true,
});

// 2) AUTO timeline: scrub/pin hata diya, ab khud chalegi
const crTl = gsap.timeline({
  paused: true,
  onComplete: () => crSpin.play(), // cards nikalne ke baad ring ghoomna shuru
});

crTl.to(crCards, {
  x: (i) => Math.cos((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
  y: (i) => Math.sin((i / crTotal) * Math.PI * 2 - Math.PI / 2) * crRadius(),
  scale: 1,
  ease: "power3.out",
  duration: 0.9,
  stagger: 0.2, // ek ek image 0.3s ke gap se aayegi
});

// main image thodi chhoti
crTl.to(".cr-main", { scale: 0.85, duration: 1, ease: "power2.inOut" }, "<");

// 3) Jab section screen par dikhe tab ek baar auto-play karo
ScrollTrigger.create({
  trigger: ".cr-stage",
  start: "top 60%",
  once: true,
  onEnter: () => crTl.play(),
});

// 4) Ring ghoomne par images ulti na hon, isliye counter-rotate
gsap.ticker.add(() => {
  const r = gsap.getProperty(".cr-ring", "rotation");
  gsap.set(crCards, { rotation: -r });
});