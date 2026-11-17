console.log('1. testimonials.js load hui');
console.log('2. gsap:', typeof gsap, '| ScrollTrigger:', typeof ScrollTrigger, '| Draggable:', typeof Draggable);

window.addEventListener('load', () => {
  if (typeof gsap === 'undefined' || typeof Draggable === 'undefined') {
    console.error('GSAP ya Draggable load nahi hua. about.html ke script tags check karo.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger, Draggable);

  const cards = gsap.utils.toArray('.tm-card');
  console.log('3. cards mile:', cards.length);
  if (!cards.length) return;

  const mid = (cards.length - 1) / 2;
  const rest = cards.map((_, i) => ({
    rotation: (i - mid) * 7,
    y: Math.abs(i - mid) * 14,
    z: i + 1,
  }));

  // fan shape
  cards.forEach((card, i) => {
    gsap.set(card, { rotation: rest[i].rotation, y: rest[i].y, zIndex: rest[i].z });
  });
  console.log('4. fan shape lag gaya');

  // entrance (scroll ke bina, seedha chalega)
  gsap.from(cards, {
    y: 200,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: 'back.out(1.4)',
    delay: 0.3,
  });

  cards.forEach((card, i) => {
    const drag = Draggable.create(card, {
      type: 'x,y',
      onPress() {
        gsap.to(card, { rotation: 0, scale: 1.08, zIndex: 100, duration: 0.25 });
      },
      onRelease() {
        gsap.to(card, {
          x: 0,
          y: rest[i].y,
          rotation: rest[i].rotation,
          scale: 1,
          duration: 1,
          ease: 'elastic.out(1, 0.5)',
          onComplete: () => gsap.set(card, { zIndex: rest[i].z }),
        });
      },
    })[0];

    card.addEventListener('mouseenter', () => {
      if (drag.isDragging) return;
      gsap.to(card, {
        y: rest[i].y - 35,
        rotation: rest[i].rotation * 0.3,
        scale: 1.05,
        zIndex: 50,
        duration: 0.35,
      });
    });

    card.addEventListener('mouseleave', () => {
      if (drag.isDragging) return;
      gsap.to(card, {
        y: rest[i].y,
        rotation: rest[i].rotation,
        scale: 1,
        zIndex: rest[i].z,
        duration: 0.5,
      });
    });
  });

  console.log('5. drag aur hover lag gaye');
});