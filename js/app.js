/* ===== Menu toggle ===== */
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
const menuLinks = document.querySelectorAll('.menu-link');

const tlMenu = gsap.timeline({ paused: true });
tlMenu.from('.menu-link, .menu-footer', {
  opacity: 0,
  y: 60,
  filter: 'blur(12px)',
  duration: 0.8,
  stagger: 0.08,
  ease: 'power4.out',
});

function closeMenu() {
  menu.classList.remove('is-open');
  menuToggle.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');
  tlMenu.reverse();
}

menuToggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menu.setAttribute('aria-hidden', String(!isOpen));
  isOpen ? tlMenu.play() : tlMenu.reverse();
});

menuLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

/* ===== Header on scroll ===== */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (window.scrollY >= 50) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
});

/* ===== Hero letter animation (Anime.js) ===== */
const heroTitle = document.querySelector('.ml1');
if (heroTitle) {
  heroTitle.innerHTML = heroTitle.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime.timeline().add({
    targets: '.ml1 .letter',
    translateX: [-120, 0],
    translateY: [-40, 0],
    opacity: [0, 1],
    filter: ['blur(12px)', 'blur(0px)'],
    easing: 'easeOutExpo',
    duration: 1800,
    delay: (el, i) => 400 + 80 * i,
  });
}

/* ===== GSAP + Lenis + ScrollTrigger ===== */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  /* Loading + hero entrance */
  const tlLoad = gsap.timeline();
  tlLoad
    .to('.screen-loading', {
      duration: 1.2,
      opacity: 0,
      delay: 1.8,
      ease: 'power4.out',
      onComplete: () => {
        document.querySelector('.screen-loading').style.display = 'none';
      },
    })
    .from(
      '.container-hero blockquote, .hero-desc, .scroll-hint',
      {
        duration: 1.4,
        opacity: 0,
        x: -60,
        stagger: 0.15,
        ease: 'power4.out',
      },
      '-=0.8'
    );

  /* Scroll reveals — pillars */
  ['.text-presentation-design', '.text-presentation-code', '.text-presentation-motion', '.text-presentation-3d'].forEach(
    (selector) => {
      gsap.from(selector, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#iam',
          start: 'top 75%',
        },
      });
    }
  );

  /* IAM section */
  gsap.from('#iam .section-tag, #iam .iam-title, #iam .iam-text', {
    opacity: 0,
    y: 60,
    duration: 1.2,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#iam',
      start: 'top 80%',
    },
  });

  /* Resume section */
  gsap.from('#resume .resume-header > *', {
    opacity: 0,
    y: 24,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#resume .resume-grid',
      start: 'top 82%',
    },
  });

  gsap.from('#resume .resume-summary', {
    opacity: 0,
    y: 30,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#resume .resume-col--profile',
      start: 'top 82%',
    },
  });

  gsap.from('#resume .resume-social', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#resume .resume-col--profile',
      start: 'top 82%',
    },
  });

  gsap.from('#resume .showcase-header .resume-pill', {
    opacity: 0,
    y: 24,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#resume .showcase-header--skills',
      start: 'top 85%',
    },
  });

  gsap.from('#resume .resume-showcase--photo .resume-photo-wrap, #resume .skills-marquee', {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.12,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#resume .resume-showcase--photo',
      start: 'top 85%',
    },
  });

  gsap.from('#resume .resume-col--experience .timeline-item', {
    opacity: 0,
    x: -30,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.resume-col--experience',
      start: 'top 82%',
    },
  });

  gsap.from('#resume .resume-col--education .timeline-item', {
    opacity: 0,
    x: 30,
    duration: 0.9,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.resume-col--education',
      start: 'top 82%',
    },
  });

  gsap.from('#resume .tool-card', {
    opacity: 0,
    scale: 0.6,
    y: 20,
    duration: 0.65,
    stagger: {
      amount: 0.8,
      grid: [6, 4],
      from: 'start',
    },
    ease: 'back.out(1.5)',
    scrollTrigger: {
      trigger: '#resume .tools-grid',
      start: 'top 88%',
    },
  });

  /* Contact */
  gsap.from('#contact .contact-label, #contact .contact-headline, #contact .contact-email', {
    opacity: 0,
    y: 80,
    duration: 1.2,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 75%',
    },
  });

  gsap.from('.contact-mascot', {
    opacity: 0,
    scale: 0.4,
    rotation: -24,
    duration: 1,
    ease: 'back.out(2)',
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 75%',
    },
  });

  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.to('.contact-mascot-hand', {
      rotation: 18,
      duration: 0.55,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      transformOrigin: '70% 80%',
    });

    gsap.to('.contact-mascot', {
      y: -10,
      duration: 2.4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
  }

  ScrollTrigger.refresh();
  syncShowcaseHeights();

  const photos = document.querySelectorAll('.resume-photo-wrap .resume-photo');
  if (photos.length >= 2 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let activeIndex = 0;

    setInterval(() => {
      photos[activeIndex].classList.remove('is-active');
      activeIndex = (activeIndex + 1) % photos.length;
      photos[activeIndex].classList.add('is-active');
    }, 4500);
  }
});

function syncShowcaseHeights() {
  const photoWrap = document.querySelector('.resume-photo-wrap');
  const skillsMarquee = document.querySelector('.skills-marquee');
  const toolsGrid = document.querySelector('.resume-showcase--tools .tools-grid');
  if (!photoWrap || !skillsMarquee) return;

  skillsMarquee.style.removeProperty('height');

  const photoHeight = photoWrap.offsetHeight;
  const toolsHeight = toolsGrid ? toolsGrid.offsetHeight : 0;
  skillsMarquee.style.height = `${Math.max(photoHeight, toolsHeight)}px`;
}

window.addEventListener('resize', syncShowcaseHeights);
window.addEventListener('load', syncShowcaseHeights);
