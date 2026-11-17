// gsap.registerPlugin(ScrollTrigger);

// const cards = gsap.utils.toArray(".s3d-card");
// const n = cards.length;

// function render(p) {
//   const gap = Math.min(window.innerWidth * 0.55, 420);

//   cards.forEach((card, i) => {
//     const offset = i - p * (n - 1);
//     const abs = Math.min(Math.abs(offset), 1.5);

//     gsap.set(card, {
//       x: offset * gap,
//       rotationY: gsap.utils.clamp(-85, 85, offset * -70),
//       scale: 1 - Math.min(abs, 1) * 0.25,
//       opacity: 1 - Math.max(abs - 1, 0) * 1.6,
//       zIndex: Math.round(100 - Math.abs(offset) * 10),
//     });
//   });
// }

// render(0);

// ScrollTrigger.create({
//   trigger: ".scroll3d-stage",
//   start: "top top",
//   end: () => "+=" + window.innerHeight * (n + 1),
//   pin: true,
//   scrub: 1,
//   onUpdate: (self) => render(self.progress),
// });

// window.addEventListener("resize", () => ScrollTrigger.refresh());

const cards = Array.from(document.querySelectorAll(".s3d-card"));
const n = cards.length;

const SPEED = 0.1;      // zyada = fast, kam = slow
const MAX_ROT = 65;      // center pe kitna rotate ho (degree)
const CARD_W = () => cards[0].offsetWidth;

let t = 0;
let last = performance.now();
let paused = false;

gsap.set(cards, { xPercent: -50, yPercent: -50 });

function render() {
  // total path screen se bada rakho taaki wrap offscreen ho
  const span = Math.max(window.innerWidth + CARD_W() * 2, n * CARD_W() * 1.1);

  cards.forEach((card, i) => {
    // u: 0 = right edge, 0.5 = center, 1 = left edge
    const u = (((i / n + t) % 1) + 1) % 1;

    const x = (0.5 - u) * span;
    const rot = -Math.sin(Math.PI * u) * MAX_ROT;      // center pe max rotate
    const scale = 0.85 + Math.sin(Math.PI * u) * 0.25;  // center pe thoda bada

    // edges pe fade in / fade out
    const fade = Math.min(u / 0.1, (1 - u) / 0.1, 1);

    gsap.set(card, {
      x,
      rotationY: rot,
      scale,
      opacity: Math.max(fade, 0),
      zIndex: Math.round(Math.sin(Math.PI * u) * 100),
    });
  });
}

function loop(now) {
  const dt = (now - last) / 1000;
  last = now;
  if (!paused) t += dt * SPEED;
  render();
  requestAnimationFrame(loop);
}

const stage = document.querySelector(".scroll3d-stage");
stage.addEventListener("mouseenter", () => (paused = true));
stage.addEventListener("mouseleave", () => (paused = false));

requestAnimationFrame(loop);