// function initImageTrail(container, options = {}) {
//   const images =
//     options.images ||
//     (container.dataset.images || "")
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean);

//   if (!images.length) return;

//   const W = options.width || 180;
//   const H = options.height || 220;
//   const THRESHOLD = options.threshold || 90;

//   const layer = document.createElement("div");
//   layer.className = "trail-layer";
//   container.prepend(layer);

//   let lastX = 0, lastY = 0, index = 0, z = 1;

//   container.addEventListener("pointermove", (e) => {
//     const rect = container.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     if (Math.hypot(x - lastX, y - lastY) < THRESHOLD) return;
//     lastX = x;
//     lastY = y;

//     spawn(x, y);
//   });

//   function spawn(x, y) {
//     const img = document.createElement("img");
//     img.src = images[index++ % images.length];
//     img.className = "trail-img";
//     img.style.width = W + "px";
//     img.style.height = H + "px";
//     img.style.zIndex = z++;
//     layer.appendChild(img);

//     const rot = gsap.utils.random(-15, 15);

//     gsap
//       .timeline({ onComplete: () => img.remove() })
//       .fromTo(
//         img,
//         { x: x - W / 2, y: y - H / 2, scale: 0.3, rotation: rot * 2, opacity: 0 },
//         { scale: 1, rotation: rot, opacity: 1, duration: 0.5, ease: "power3.out" }
//       )
//       .to(
//         img,
//         { scale: 0.6, opacity: 0, y: "+=40", duration: 0.7, ease: "power2.in" },
//         "+=0.5"
//       );
//   }
// }

// Auto-init: jis element par data-trail hai, wahan effect lag jayega
// document.querySelectorAll("[data-trail]").forEach((el) => initImageTrail(el));

function initImageTrail(container, options = {}) {
  const images =
    options.images ||
    (container.dataset.images || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  if (!images.length) return;

  const W = options.width || 180;
  const H = options.height || 220;
  const THRESHOLD = options.threshold || 90;
  const AUTO = options.auto !== false;      // auto play on/off
  const AUTO_SPEED = options.autoSpeed || 0.04; // badhao = tez movement
  const AUTO_GAP = options.autoGap || 300;  // ms, kitni der mein nayi image
  const IDLE = options.idle || 1200;        // mouse rukne ke kitni der baad auto start

  const layer = document.createElement("div");
  layer.className = "trail-layer";
  container.prepend(layer);

  let lastX = 0, lastY = 0, index = 0, z = 1;
  let lastMove = 0;
  let visible = true;
  let t = 0;

  container.addEventListener("pointermove", (e) => {
    lastMove = Date.now();
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (Math.hypot(x - lastX, y - lastY) < THRESHOLD) return;
    lastX = x;
    lastY = y;
    spawn(x, y);
  });

  // Auto mode: mouse ruka ho to images khud ek path par chalti rahengi
  if (AUTO) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }).observe(container);

    setInterval(() => {
      if (!visible) return;
      if (Date.now() - lastMove < IDLE) return;

      const rect = container.getBoundingClientRect();
      t += AUTO_SPEED * (AUTO_GAP / 16);
      const x = rect.width / 2 + Math.cos(t) * rect.width * 0.38;
      const y = rect.height / 2 + Math.sin(t * 1.4) * rect.height * 0.3;
      spawn(x, y);
    }, AUTO_GAP);
  }

  function spawn(x, y) {
    const img = document.createElement("img");
    img.src = images[index++ % images.length];
    img.className = "trail-img";
    img.style.width = W + "px";
    img.style.height = H + "px";
    img.style.zIndex = z++;
    layer.appendChild(img);

    const rot = gsap.utils.random(-15, 15);

    gsap
      .timeline({ onComplete: () => img.remove() })
      .fromTo(
        img,
        { x: x - W / 2, y: y - H / 2, scale: 0.3, rotation: rot * 2, opacity: 0 },
        { scale: 1, rotation: rot, opacity: 1, duration: 0.5, ease: "power3.out" }
      )
      .to(
        img,
        { scale: 0.6, opacity: 0, y: "+=40", duration: 0.7, ease: "power2.in" },
        "+=0.5"
      );
  }
}

// document.querySelectorAll("[data-trail]").forEach((el) => initImageTrail(el));
document.querySelectorAll("[data-trail]").forEach((el) =>
  initImageTrail(el, { autoGap: 200, autoSpeed: 0.05, idle: 800 })
);