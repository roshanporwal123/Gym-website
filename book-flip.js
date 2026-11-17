// DOM ready hone ke baad hi chalao
document.addEventListener("DOMContentLoaded", () => {

  // sirf is section ko dhoondo
  const section = document.querySelector(".bk-section");

  // section is page pe nahi hai to ruk jao
  if (!section) return;

  // GSAP load nahi hua to ruk jao
  if (typeof gsap === "undefined") {
    console.warn("GSAP load nahi hua");
    return;
  }

  // section ke andar ke elements
  const book = section.querySelector(".bk-book");
  const pages = gsap.utils.toArray(".bk-page", section);

  if (!book || pages.length === 0) return;

  const n = pages.length;                      // total pages
  const pageH = () => pages[0].offsetHeight;   // ek page ki height

  // ---- settings (yahan se badlo) ----
  const FLIP_TIME = 0.6;   // ek page palatne me kitne second (kam = fast)
  const HOLD_TIME = 0;   // har page palatne ke baad kitna ruke
  const END_PAUSE = 1.2;   // aakhri page ke baad kitna ruke, phir reset

  // band book me pehla page sabse upar rahe
  pages.forEach((page, i) => gsap.set(page, { z: (n - i) * 2 }));

  // band book upar wale half me hoti hai, isliye neeche khiskao taaki center me dikhe
  gsap.set(book, { y: () => pageH() / 2 });

  // timeline: apne aap chalegi aur loop hogi
  const tl = gsap.timeline({
    repeat: -1,        // hamesha loop
    defaults: { ease: "power2.inOut" },
  });

  // book ko shuru me center me laao (pehla page palatne se pehle)
  tl.to(book, { y: 0, duration: FLIP_TIME });

  // har page ek-ek karke palatta hai
  pages.forEach((page, i) => {
    tl.to(page, {
      rotationX: -180,     // upar se neeche palatna
      z: i * 2,            // palatne ke baad order ulta ho jaye
      duration: FLIP_TIME,
    });
    tl.to({}, { duration: HOLD_TIME });   // palatne ke baad thoda ruko
  });

  // aakhri page ke baad ruko
  tl.to({}, { duration: END_PAUSE });

  // sab pages wapas band karo, taaki loop dobara shuru ho
  tl.to(pages, {
    rotationX: 0,
    z: (i) => (n - i) * 2,
    duration: 0.8,
    stagger: 0.1,
  });
  tl.to(book, { y: () => pageH() / 2, duration: 0.6 }, "<");

  // hover pe pause, bahar jaane par resume
  section.addEventListener("mouseenter", () => tl.pause());
  section.addEventListener("mouseleave", () => tl.resume());

  // resize pe page height badalti hai, isliye timeline refresh
  window.addEventListener("resize", () => tl.invalidate());
});

const bkIntro = document.querySelector('.bk-intro');
if (bkIntro) {
  new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        bkIntro.classList.add('in-view');
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 }).observe(bkIntro);
}