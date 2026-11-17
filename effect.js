const slots = gsap.utils.toArray(".fx-slot");
const imgs = [
  "images/Muscle-Gain.jpg",
  "images/trainer2.jpg",
  "images/Cardio.jpg",
  "images/Fitness.jpg"
];
let index = 0;

if (slots.length) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.8 });

  tl.to(slots, { width: "1em", duration: 0.7, ease: "power3.out", stagger: 0.15 })
    .to(slots, { duration: 1 })
    .to(slots, {
      width: 0,
      duration: 0.6,
      ease: "power3.in",
      stagger: 0.1,
      onComplete: () => {
        slots.forEach((slot) => {
          index = (index + 1) % imgs.length;
          slot.querySelector("img").src = imgs[index];
        });
      }
    });

  const card = document.querySelector(".fx-card");
  card.addEventListener("mouseenter", () => tl.pause());
  card.addEventListener("mouseleave", () => tl.play());
}