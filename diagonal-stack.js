// DOM ready hone ke baad chalao
document.addEventListener("DOMContentLoaded", () => {

  // sirf is section ko dhoondo
  const section = document.querySelector(".dg-section");
  if (!section) return;                         // section nahi hai to ruk jao

  const stage = section.querySelector(".dg-stage");
  const cards = Array.from(section.querySelectorAll(".dg-card"));
  const n = cards.length;
  if (!stage || n === 0) return;

  // ---- settings (yahan se badlo) ----
  const AUTO = 0.6;      // apne aap kitne cards/second sarkein (0 = band)
  const DRAG = 0.008;     // drag ki sensitivity
  const SCROLL = 0.004;   // page scroll ki sensitivity
  const SMOOTH = 0.08;    // 0.05 = bahut smooth/slow, 0.2 = jaldi
  const ROT_Y = -52;      // panels ki slant (degree)
  const SPAN_X = 0.7;    // diagonal ki lambai (screen width ka hissa)
  const SPAN_Y = 0.7;    // diagonal ki unchai (stage height ka hissa)

  let target = 0;         // jahan pahunchna hai
  let current = 0;        // abhi kahan hai (smooth chalta hai)
  let dragging = false;
  let lastX = 0;
  let mx = 0, my = 0;     // mouse position (-1 se 1)
  let lastY = window.scrollY;
  let last = performance.now();

  // ---- DRAG ----
  stage.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    stage.classList.add("dg-dragging");
    stage.setPointerCapture(e.pointerId);
  });

  stage.addEventListener("pointermove", (e) => {
    // mouse position tilt ke liye
    const r = stage.getBoundingClientRect();
    mx = ((e.clientX - r.left) / r.width) * 2 - 1;
    my = ((e.clientY - r.top) / r.height) * 2 - 1;

    // drag chal raha ho to target badlo
    if (dragging) {
      target -= (e.clientX - lastX) * DRAG;
      lastX = e.clientX;
    }
  });

  const stopDrag = () => {
    dragging = false;
    stage.classList.remove("dg-dragging");
  };
  stage.addEventListener("pointerup", stopDrag);
  stage.addEventListener("pointercancel", stopDrag);

  // mouse bahar jaye to tilt wapas center
  stage.addEventListener("pointerleave", () => { mx = 0; my = 0; });

  // ---- PAGE SCROLL ----
  window.addEventListener("scroll", () => {
    target += (window.scrollY - lastY) * SCROLL;
    lastY = window.scrollY;
  }, { passive: true });

  // ---- RENDER ----
  function render() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;

    cards.forEach((card, i) => {
      // p: 0 se n ke beech position, loop me ghoomta hai
      const p = (((i - current) % n) + n) % n;

      // t: -0.5 (neeche-left) se +0.5 (upar-right)
      const t = p / n - 0.5;

      // diagonal position
      const x = t * w * SPAN_X * 2;
      const y = -t * h * SPAN_Y * 2;

      // mouse ke hisaab se halka tilt
      const rotY = ROT_Y + mx * 8;
      const rotX = -my * 6;

      // dono sire pe fade in / fade out, taaki loop ka jump na dikhe
      const edge = Math.min(p, n - p);
      const opacity = Math.min(edge / 0.8, 1);

      card.style.opacity = opacity;
      card.style.zIndex = Math.round(p * 10);
      card.style.transform =
        `translate(-50%, -50%) translate3d(${x}px, ${y}px, 0) ` +
        `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
  }

  // ---- LOOP ----
  function loop(now) {
    const dt = (now - last) / 1000;
    last = now;

    if (!dragging) target += dt * AUTO;         // drag me auto band
    current += (target - current) * SMOOTH;     // smooth follow

    render();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
});