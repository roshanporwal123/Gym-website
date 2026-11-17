(function (){
gsap.registerPlugin(ScrollTrigger);

const ring = document.getElementById("r3dRing");
const tilt = document.getElementById("r3dTilt");
const scene = document.getElementById("r3dScene");

// apni images yaha daalo
const images = [
  "images/Gym1.jpg",
  "images/Gym3.jpg",
  "images/Gym4.jpg",
  "images/Gym5.jpg",
  "images/overhead.jpg",
  "images/single leg lunge.jpg",
  "images/plank.jpg",
  "images/DeadLift.jpg",
  "images/pullup.jpg",
  "images/pushup.jpg"
];

const COUNT = images.length;
const RADIUS = window.innerWidth < 600 ? 260 : 440;

// cards ko gol me lagao
images.forEach((src, i) => {
  const card = document.createElement("div");
  card.className = "r3d-card";
  card.innerHTML = `<img src="${src}" alt="gym photo ${i + 1}">`;
  const angle = (360 / COUNT) * i;
  card.style.transform = `rotateY(${angle}deg) translateZ(${RADIUS}px)`;
  ring.appendChild(card);
});

// scroll karne par ring gol ghume
// gsap.to(ring, {
//   rotationY: 360,
//   ease: "none",
//   scrollTrigger: {
//     trigger: "#gallery3d",
//     start: "top bottom",
//     end: "bottom top",
//     scrub: 1
//   }
// });

// AUTO ROTATE (continuous gol ghume)
const spin = gsap.to(ring, {
  rotationY: "+=360",
  duration: 10,        // kam karo = tez, zyada karo = slow
  ease: "none",
  repeat: -1
});

// mouse scene pe aaye to dheere ruke, hatne par wapas chale
scene.addEventListener("mouseenter", () => {
  gsap.to(spin, { timeScale: 0.2, duration: 0.6 });
});
scene.addEventListener("mouseleave", () => {
  gsap.to(spin, { timeScale: 1, duration: 0.6 });
});

// mouse se upar-niche halka tilt
const tiltX = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3.out" });
const tiltY = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3.out" });

scene.addEventListener("mousemove", (e) => {
  const r = scene.getBoundingClientRect();
  const nx = (e.clientX - r.left) / r.width - 0.5;
  const ny = (e.clientY - r.top) / r.height - 0.5;
  tiltX(-ny * 25);   // upar-niche
  tiltY(nx * 15);    // halka side
});

scene.addEventListener("mouseleave", () => {
  tiltX(0);
  tiltY(0);
});
})();