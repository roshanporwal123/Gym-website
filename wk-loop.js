// (function () {
//   const track = document.getElementById("wkTrack");
//   const prev = document.getElementById("wkPrev");
//   const next = document.getElementById("wkNext");
//   const slider = document.getElementById("wkSlider");
//   if (!track) return;

//   const originals = Array.from(track.children);
//   originals.forEach((c) => track.appendChild(c.cloneNode(true)));

//   let x = 0;
//   let goal = 0;
//   let paused = false;
//   const SPEED = 3.5; // bada number = fast
//   let loopW = 0;
//   let step = 0;

//   function measure() {
//     const cards = track.children;
//     loopW = cards[originals.length].offsetLeft - cards[0].offsetLeft;
//     step = cards[1].offsetLeft - cards[0].offsetLeft;
//   }
//   measure();
//   window.addEventListener("resize", measure);
//   window.addEventListener("load", measure);

//   function tick() {
//     if (!paused) goal += SPEED;
//     x += (goal - x) * 0.1;

//     if (x >= loopW) { x -= loopW; goal -= loopW; }
//     if (x < 0) { x += loopW; goal += loopW; }

//     track.style.transform = "translateX(" + -x + "px)";
//     requestAnimationFrame(tick);
//   }
//   requestAnimationFrame(tick);

//   next.addEventListener("click", () => { goal += step; });
//   prev.addEventListener("click", () => { goal -= step; });

//   slider.addEventListener("mouseenter", () => { paused = true; });
//   slider.addEventListener("mouseleave", () => { paused = false; });
// })();

(function () {
  const track = document.getElementById("wkTrack");
  const prev = document.getElementById("wkPrev");
  const next = document.getElementById("wkNext");
  const slider = document.getElementById("wkSlider");
  if (!track || !slider) return;

  const CLS = "active";
  const SPEED = 0.6; // cards per second (0.4 = slow, 0.6 = medium, 1 = tez)

  const originals = Array.from(track.children);
  const n = originals.length;

  // 2 baar clone: left aur right dono taraf cards rahein
  for (let r = 0; r < 2; r++) {
    originals.forEach((c) => {
      const k = c.cloneNode(true);
      k.setAttribute("aria-hidden", "true");
      track.appendChild(k);
    });
  }

  let step = 0;
  let cardW = 0;
  let p = n;          // current position (card number), n se start = beech wala set
  let pending = 0;    // arrow click ka movement
  let paused = false;
  let current = null;
  let last = performance.now();

  function measure() {
    const c = track.children;
    step = c[1].offsetLeft - c[0].offsetLeft;
    cardW = c[0].offsetWidth;
  }
  measure();
  window.addEventListener("load", measure);
  window.addEventListener("resize", measure);

  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;

    if (!paused) p += SPEED * dt;

    // arrow click smooth
    const move = pending * 0.15;
    p += move;
    pending -= move;
    if (Math.abs(pending) < 0.01) { p += pending; pending = 0; }

    // seamless wrap (n se 2n ke beech rehta hai)
    while (p >= 2 * n) p -= n;
    while (p < n) p += n;

    // p-th card ko slider ke center me rakho
    const x = p * step + cardW / 2 - slider.clientWidth / 2;
    track.style.transform = "translate3d(" + -x + "px,0,0)";

    // highlight: sirf number se, layout se koi lena dena nahi
    const el = track.children[Math.round(p)];
    if (el && el !== current) {
      if (current) current.classList.remove(CLS);
      el.classList.add(CLS);
      current = el;
    }

    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  if (next) next.addEventListener("click", () => { pending += 1; });
  if (prev) prev.addEventListener("click", () => { pending -= 1; });

  slider.addEventListener("mouseenter", () => { paused = true; });
  slider.addEventListener("mouseleave", () => { paused = false; });
})();