// // Mobile menu
// const burger = document.getElementById('burger');
// const menu = document.getElementById('menu');
// burger.addEventListener('click', () => menu.classList.toggle('open'));
// menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// // Hero video slow motion (video file ho to)
// const vid = document.getElementById('heroVideo');
// vid.addEventListener('loadedmetadata', () => { vid.playbackRate = 0.5; });

// // Scroll reveal
// const io = new IntersectionObserver((entries) => {
//   entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } });
// }, { threshold: 0.15 });
// document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// // Active nav link
// const links = [...menu.querySelectorAll('a:not(.btn)')];
// const secObs = new IntersectionObserver((entries) => {
//   entries.forEach(e => {
//     if (e.isIntersecting) {
//       links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
//     }
//   });
// }, { rootMargin: '-45% 0px -50% 0px' });
// document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

// // ===== Scroll line + dumbbell =====
// const path = document.getElementById('drawPath');
// const dumbbell = document.getElementById('dumbbell');
// const spin = document.getElementById('dbSpin');
// const nav = document.getElementById('nav');
// const len = path.getTotalLength();
// path.style.strokeDasharray = len;
// path.style.strokeDashoffset = len;

// let target = 0, current = 0;

// window.addEventListener('scroll', () => {
//   const max = document.documentElement.scrollHeight - innerHeight;
//   target = max > 0 ? scrollY / max : 0;
//   nav.classList.toggle('scrolled', scrollY > 60);
// });

// function animate() {
//   current += (target - current) * 0.06;            // smooth, slow-motion feel
//   const drawn = len * current;
//   path.style.strokeDashoffset = len - drawn;

//   const p = path.getPointAtLength(drawn);          // line ki nok ki position
//   const pop = Math.min(current * 12, 1);           // shuru mein dumbbell "khilta" hai
//   dumbbell.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${pop})`);
//   spin.setAttribute('transform', `rotate(${current * 720})`);

//   requestAnimationFrame(animate);
// }
// animate();


// document.getElementById('year').textContent = new Date().getFullYear();

// // About video: slow motion + sirf screen par dikhe tab play (performance)
// const aboutVid = document.querySelector('.about-video .bg-video');
// aboutVid.addEventListener('loadedmetadata', () => { aboutVid.playbackRate = 0.6; });
// new IntersectionObserver((entries) => {
//   entries.forEach(e => e.isIntersecting ? aboutVid.play() : aboutVid.pause());
// }, { threshold: 0.2 }).observe(aboutVid);

// const form = document.getElementById('contactForm');
// const msg = document.getElementById('formMsg');
// form.addEventListener('submit', e => {
//   e.preventDefault();
//   msg.textContent = '✅ Thanks! Hum jaldi aapse contact karenge.';
//   form.reset();
// });

// (() => {
//   const track = document.getElementById('wkTrack');
//   const slider = document.getElementById('wkSlider');
//   const cards = [...track.querySelectorAll('.wk-card')];
//   const modal = document.getElementById('wkModal');
//   const vid = document.getElementById('wkVideo');
//   let i = 1; // pehle kaunsa card active ho

//   function go(n){
//     i = (n + cards.length) % cards.length;
//     cards.forEach((c, k) => c.classList.toggle('active', k === i));
//     const c = cards[i];
//     const offset = slider.offsetWidth / 2 - (c.offsetLeft + c.offsetWidth / 2);
//     track.style.transform = `translateX(${offset}px)`;
//   }

//   cards.forEach((c, k) => c.addEventListener('click', () => go(k)));
//   document.getElementById('wkPrev').onclick = () => go(i - 1);
//   document.getElementById('wkNext').onclick = () => go(i + 1);
//   addEventListener('resize', () => go(i));
//   addEventListener('load', () => go(i));
//   go(i);

//   // Auto scroll
//   let timer;
//   const DELAY = 1000; // 3 second, jitna chahiye utna karo
//   const start = () => { stop(); timer = setInterval(() => {
//     if (!modal.classList.contains('open')) go(i + 1);
//   }, DELAY); };
//   const stop = () => clearInterval(timer);

//   slider.addEventListener('mouseenter', stop);
//   slider.addEventListener('mouseleave', start);
//   slider.addEventListener('touchstart', stop, {passive:true});
//   slider.addEventListener('touchend', start);
//   document.getElementById('wkPrev').addEventListener('click', start);
//   document.getElementById('wkNext').addEventListener('click', start);

//   // Sirf tab chale jab section screen par ho
//   new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), {threshold:.3})
//     .observe(slider);

//   // swipe (mobile)
//   let sx = 0;
//   slider.addEventListener('touchstart', e => sx = e.touches[0].clientX, {passive:true});
//   slider.addEventListener('touchend', e => {
//     const dx = e.changedTouches[0].clientX - sx;
//     if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
//   });

//   // Watch button -> video popup
//   track.querySelectorAll('.wk-watch').forEach(btn => {
//     btn.addEventListener('click', e => {
//       e.stopPropagation();
//       vid.src = btn.closest('.wk-card').dataset.video;
//       modal.classList.add('open');
//       vid.play();
//     });
//   });
//   const close = () => { vid.pause(); vid.removeAttribute('src'); modal.classList.remove('open'); };
//   document.getElementById('wkClose').onclick = close;
//   modal.addEventListener('click', e => { if (e.target === modal) close(); });
// })();

// ===== Mobile menu (har page) =====
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
if (burger && menu) {
  burger.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
}

// ===== Hero video slow motion (sirf Home) =====
const heroVid = document.getElementById('heroVideo');
if (heroVid) {
  heroVid.addEventListener('loadedmetadata', () => { heroVid.playbackRate = 0.5; });
}

// ===== Scroll reveal (har page) =====
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// ===== Scroll line + dumbbell (har page) =====
const nav = document.getElementById('nav');
const path = document.getElementById('drawPath');
const dumbbell = document.getElementById('dumbbell');
const spin = document.getElementById('dbSpin');

if (nav) {
  nav.classList.toggle('scrolled', scrollY > 60);
}

if (path && dumbbell && spin) {
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;

  let target = 0, current = 0;

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    target = max > 0 ? scrollY / max : 0;
    if (nav) nav.classList.toggle('scrolled', scrollY > 60);
  });

  function animate() {
    current += (target - current) * 0.06;          // smooth, slow-motion feel
    const drawn = len * current;
    path.style.strokeDashoffset = len - drawn;

    const p = path.getPointAtLength(drawn);        // line ki nok ki position
    const pop = Math.min(current * 12, 1);         // shuru mein dumbbell "khilta" hai
    dumbbell.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${pop})`);
    spin.setAttribute('transform', `rotate(${current * 720})`);

    requestAnimationFrame(animate);
  }
  animate();
} else if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 60));
}

// ===== Footer year (har page) =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== About video: slow motion + sirf screen par dikhe tab play (About page) =====
const aboutVid = document.querySelector('.about-video .bg-video');
if (aboutVid) {
  aboutVid.addEventListener('loadedmetadata', () => { aboutVid.playbackRate = 0.6; });
  new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting ? aboutVid.play() : aboutVid.pause());
  }, { threshold: 0.2 }).observe(aboutVid);
}

// ===== Contact form (Contact page) =====
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
if (form && msg) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    msg.textContent = '✅ Thanks! Hum jaldi aapse contact karenge.';
    form.reset();
  });
}

// ===== Workouts slider + video popup (Programs page) =====
(() => {
  const track = document.getElementById('wkTrack');
  const slider = document.getElementById('wkSlider');
  const modal = document.getElementById('wkModal');
  const vid = document.getElementById('wkVideo');
  if (!track || !slider || !modal || !vid) return;

  const cards = [...track.querySelectorAll('.wk-card')];
  let i = 1; // pehle kaunsa card active ho

  function go(n) {
    i = (n + cards.length) % cards.length;
    cards.forEach((c, k) => c.classList.toggle('active', k === i));
    const c = cards[i];
    const offset = slider.offsetWidth / 2 - (c.offsetLeft + c.offsetWidth / 2);
    track.style.transform = `translateX(${offset}px)`;
  }

  cards.forEach((c, k) => c.addEventListener('click', () => go(k)));
  document.getElementById('wkPrev').onclick = () => go(i - 1);
  document.getElementById('wkNext').onclick = () => go(i + 1);
  addEventListener('resize', () => go(i));
  addEventListener('load', () => go(i));
  go(i);

  // Auto scroll
  let timer;
  const DELAY = 1000; // milliseconds, jitna chahiye utna karo (3000 = 3 sec)
  const stop = () => clearInterval(timer);
  const start = () => {
    stop();
    timer = setInterval(() => {
      if (!modal.classList.contains('open')) go(i + 1);
    }, DELAY);
  };

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  slider.addEventListener('touchstart', stop, { passive: true });
  slider.addEventListener('touchend', start);
  document.getElementById('wkPrev').addEventListener('click', start);
  document.getElementById('wkNext').addEventListener('click', start);

  // Sirf tab chale jab section screen par ho
  new IntersectionObserver(([e]) => e.isIntersecting ? start() : stop(), { threshold: 0.3 })
    .observe(slider);

  // Swipe (mobile)
  let sx = 0;
  slider.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  });

  // Watch button -> video popup
  track.querySelectorAll('.wk-watch').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      vid.src = btn.closest('.wk-card').dataset.video;
      modal.classList.add('open');
      vid.play();
    });
  });

  const close = () => {
    vid.pause();
    vid.removeAttribute('src');
    modal.classList.remove('open');
  };
  document.getElementById('wkClose').onclick = close;
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
})();
// ===== Home hero slider (sirf Home page) =====
(() => {
  const hs = document.getElementById('home');
  if (!hs || !hs.classList.contains('hs')) return;

  const slides = [...hs.querySelectorAll('.hs-slide')];
  const bgs = [...hs.querySelectorAll('.hs-bg')];
  const dotsBox = document.getElementById('hsDots');
  let i = 0, timer;

  // Dots
  const dots = slides.map((_, k) => {
    const d = document.createElement('button');
    d.className = 'hs-dot' + (k === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Slide ' + (k + 1));
    d.addEventListener('click', () => { go(k); restart(); });
    dotsBox.appendChild(d);
    return d;
  });

  // Sirf active video play ho, baaki pause (performance)
  function syncVideos() {
    bgs.forEach((v, k) => {
      if (k === i) {
        v.playbackRate = 0.6;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }

  function go(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('active', k === i));
    bgs.forEach((b, k) => b.classList.toggle('active', k === i));
    dots.forEach((d, k) => d.classList.toggle('active', k === i));
    syncVideos();
  }

  const DELAY = 2000; // 2 second, jitna chahiye utna karo
  const stop = () => clearInterval(timer);
  const start = () => { stop(); timer = setInterval(() => go(i + 1), DELAY); };
  const restart = start;

  document.getElementById('hsPrev').addEventListener('click', () => { go(i - 1); restart(); });
  document.getElementById('hsNext').addEventListener('click', () => { go(i + 1); restart(); });

  // Mouse hover par pause
  hs.addEventListener('mouseenter', stop);
  hs.addEventListener('mouseleave', start);

  // Swipe (mobile)
  let sx = 0;
  hs.addEventListener('touchstart', e => { sx = e.touches[0].clientX; stop(); }, { passive: true });
  hs.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
    start();
  });

  // Keyboard arrows
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { go(i + 1); restart(); }
    if (e.key === 'ArrowLeft')  { go(i - 1); restart(); }
  });

  // Tab chhupa ho to slider ruk jaye
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  go(0);
  start();
})();

// ===== Footer newsletter =====
(() => {
  const nf = document.getElementById('newsForm');
  const nm = document.getElementById('newsMsg');
  if (!nf || !nm) return;
  nf.addEventListener('submit', e => {
    e.preventDefault();
    nm.textContent = '✅ Subscribed! Tips jaldi aapke inbox mein aayenge.';
    nf.reset();
    setTimeout(() => { nm.textContent = ''; }, 4000);
  });
})();

// ===== Stats counter (Home page) =====
(() => {
  const nums = document.querySelectorAll('.sc-num');
  if (!nums.length) return;

  const animate = (el) => {
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const duration = 2000; // 2 second
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // shuru mein tez, end mein slow
      el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animate(e.target);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => io.observe(n));
})();

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => observer.observe(el));

// FAQ Accordion
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const ans = item.querySelector('.faq-a');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // pehle sab band karo (ek time pe ek hi khula rahe)
    document.querySelectorAll('.faq-item').forEach(other => {
      other.classList.remove('open');
      other.querySelector('.faq-a').style.maxHeight = null;
      other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // agar band tha to ab kholo
    if (!isOpen) {
      item.classList.add('open');
      ans.style.maxHeight = ans.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});
// Program Categories reveal on scroll
const pcCards = document.querySelectorAll('.pc-card');

const pcObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const i = [...pcCards].indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('show'), (i % 3) * 120);
      pcObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

pcCards.forEach((card) => pcObserver.observe(card));

// What's Included - scroll reveal
const incCards = document.querySelectorAll('.inc-card');

incCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
});

const incObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 100);
      incObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

incCards.forEach(card => incObserver.observe(card));

window.addEventListener('load', () => {
  console.log('programs script chala', typeof gsap, typeof ScrollTrigger);

  const section = document.querySelector('.programs');
  const track = document.querySelector('.programs-track');
  if (!section || !track || typeof gsap === 'undefined') return;

//   gsap.registerPlugin(ScrollTrigger, Draggable);

//   function initTestimonials() {
//   const cards = gsap.utils.toArray('.tm-card');
//   if (!cards.length) return;

//   const n = cards.length;
//   const mid = (n - 1) / 2;

//   const rest = cards.map((_, i) => ({
//     rotation: (i - mid) * 7,
//     y: Math.abs(i - mid) * 14,
//     z: i + 1,
//   }));

//   cards.forEach((card, i) => {
//     gsap.set(card, { rotation: rest[i].rotation, y: rest[i].y, zIndex: rest[i].z });
//   });

//   gsap.from(cards, {
//     y: 250,
//     opacity: 0,
//     rotation: 0,
//     duration: 1.1,
//     stagger: 0.12,
//     ease: 'back.out(1.4)',
//     scrollTrigger: { trigger: '.tm-stage', start: 'top 80%' },
//   });

//   cards.forEach((card, i) => {
//     const drag = Draggable.create(card, {
//       type: 'x,y',
//       onPress() {
//         gsap.to(card, { rotation: 0, scale: 1.08, zIndex: 100, duration: 0.25 });
//       },
//       onRelease() {
//         gsap.to(card, {
//           x: 0,
//           y: rest[i].y,
//           rotation: rest[i].rotation,
//           scale: 1,
//           duration: 1,
//           ease: 'elastic.out(1, 0.5)',
//           onComplete: () => gsap.set(card, { zIndex: rest[i].z }),
//         });
//       },
//     })[0];

//     card.addEventListener('mouseenter', () => {
//       if (drag.isDragging) return;
//       gsap.to(card, {
//         y: rest[i].y - 35,
//         rotation: rest[i].rotation * 0.3,
//         scale: 1.05,
//         zIndex: 50,
//         duration: 0.35,
//         ease: 'power3.out',
//       });
//     });

//     card.addEventListener('mouseleave', () => {
//       if (drag.isDragging) return;
//       gsap.to(card, {
//         y: rest[i].y,
//         rotation: rest[i].rotation,
//         scale: 1,
//         zIndex: rest[i].z,
//         duration: 0.5,
//         ease: 'power3.out',
//       });
//     });
//   });
// }

// window.addEventListener('load', () => {
//   initTestimonials();
// });  


  const getDistance = () => track.scrollWidth - window.innerWidth;

  // section ki height = horizontal distance + ek screen
  const setHeight = () => {
    section.style.height = getDistance() + window.innerHeight + 'px';
  };
  setHeight();

  gsap.to(track, {
    x: () => -getDistance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      invalidateOnRefresh: true,
      onRefresh: setHeight,
    },
  });
});

// ===== FREE TRIAL =====
(function () {
  const form = document.getElementById("trialForm");
  const success = document.getElementById("trialSuccess");
  const resetBtn = document.getElementById("trialReset");
  if (!form) return;

  // Offer runs for 7 days and stays in sync on every visit
  let endTime = localStorage.getItem("trialEnd");
  if (!endTime || Number(endTime) < Date.now()) {
    endTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem("trialEnd", endTime);
  }

  function tick() {
    const diff = Math.max(0, Number(endTime) - Date.now());
    const pad = (n) => String(n).padStart(2, "0");
    document.getElementById("tDays").textContent = pad(Math.floor(diff / 86400000));
    document.getElementById("tHours").textContent = pad(Math.floor((diff / 3600000) % 24));
    document.getElementById("tMins").textContent = pad(Math.floor((diff / 60000) % 60));
    document.getElementById("tSecs").textContent = pad(Math.floor((diff / 1000) % 60));
  }
  tick();
  setInterval(tick, 1000);

  // Validation helpers
  function setError(input, msg) {
    const group = input.closest(".form-group");
    group.classList.toggle("invalid", !!msg);
    group.querySelector(".error").textContent = msg || "";
    return !msg;
  }

  function validate() {
    const name = document.getElementById("tName");
    const phone = document.getElementById("tPhone");
    const email = document.getElementById("tEmail");
    const goal = document.getElementById("tGoal");
    const slot = document.getElementById("tTime");

    const results = [
      setError(name, name.value.trim().length < 3 ? "Name must be at least 3 letters" : ""),
      setError(phone, !/^[6-9]\d{9}$/.test(phone.value.trim()) ? "Enter a valid 10-digit number" : ""),
      setError(email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "Enter a valid email" : ""),
      setError(goal, !goal.value ? "Please select a goal" : ""),
      setError(slot, !slot.value ? "Please select a slot" : ""),
    ];
    return results.every(Boolean);
  }

  // Allow only digits in phone field
  document.getElementById("tPhone").addEventListener("input", (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  // Submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const btn = form.querySelector("button[type='submit']");
    btn.disabled = true;
    btn.textContent = "Booking...";

    const data = {
      name: document.getElementById("tName").value.trim(),
      phone: document.getElementById("tPhone").value.trim(),
      email: document.getElementById("tEmail").value.trim(),
      goal: document.getElementById("tGoal").value,
      slot: document.getElementById("tTime").value,
    };

    try {
      // Uncomment when your MERN backend is ready:
      // await fetch("http://localhost:5000/api/trial", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });

      await new Promise((r) => setTimeout(r, 800)); // fake delay
      console.log("Trial booking:", data);

      document.getElementById("sName").textContent = data.name;
      form.classList.add("hide");
      success.classList.add("show");
      form.reset();
    } catch (err) {
      alert("Something went wrong, please try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Book My Free Trial";
    }
  });

  // Book another
  resetBtn.addEventListener("click", () => {
    success.classList.remove("show");
    form.classList.remove("hide");
  });
})();
