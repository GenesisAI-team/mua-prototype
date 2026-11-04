import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const MENU_EVENT = 'mua:menu';
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');

type MotionWindow = Window & { __muaMotionFallback?: number };

function initSmoothScroll(): Lenis | null {
  if (REDUCED_MOTION.matches) {
    return null;
  }

  const lenis = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.15,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  document.addEventListener(MENU_EVENT, (event) => {
    const open = (event as CustomEvent<{ open: boolean }>).detail.open;

    if (open) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  return lenis;
}

function initAnchorScrolling(lenis: Lenis | null): void {
  if (!lenis) {
    return;
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      const target = document.querySelector<HTMLElement>(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      window.requestAnimationFrame(() => {
        lenis.start();
        lenis.scrollTo(target, {
          offset: -76,
          duration: 1.1,
        });
      });
    });
  });
}

function initHero(): void {
  if (REDUCED_MOTION.matches) {
    return;
  }

  const lines = gsap.utils.toArray<HTMLElement>('[data-hero-title] .hero-line__inner');

  if (lines.length) {
    gsap.fromTo(
      lines,
      { yPercent: 110, y: 0 },
      {
        yPercent: 0,
        y: 0,
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.09,
        delay: 0.12,
      },
    );
  }

  const intro = gsap.utils.toArray<HTMLElement>('[data-hero-sub], [data-hero-actions]');

  if (intro.length) {
    gsap.fromTo(
      intro,
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.6,
      },
    );
  }

  const heroMedia = gsap.utils.toArray<HTMLElement>(
    '.hero-visual [data-image-inner]',
  );

  if (heroMedia.length) {
    gsap.fromTo(
      heroMedia,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.35,
        ease: 'power4.out',
        stagger: 0.08,
        delay: 0.18,
      },
    );
  }
}

function initHeroFloat(): void {
  if (!window.matchMedia('(max-width: 899px)').matches) {
    return;
  }

  const main = document.querySelector<HTMLElement>('.hero-visual__media--mobile');
  const facade = document.querySelector<HTMLElement>('.hero-visual__media--facade');

  if (!main || !facade) {
    return;
  }

  const imgs = [main, facade]
    .map((el) => el.querySelector('img'))
    .filter((img): img is HTMLImageElement => Boolean(img));

  void Promise.all(
    imgs.map((img) =>
      img.complete && img.naturalWidth > 0
        ? img.decode().catch(() => undefined)
        : new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true });
            img.addEventListener('error', () => resolve(), { once: true });
          }),
    ),
  ).then(() => {
    // Perspective anchored to each element's own center: a shared perspective
    // origin (the collage center) made the rotation translate the images a few
    // px vertically on every breath, which read as jitter while scrolling.
    gsap.set([main, facade], { transformPerspective: 1200 });

    const tweens = [
      gsap.fromTo(
        main,
        { rotationX: -7 },
        {
          rotationX: 7,
          duration: 3.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      ),
      gsap.fromTo(
        facade,
        { rotationX: 7 },
        {
          rotationX: -7,
          duration: 3.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        },
      ),
    ];

    // Re-projection of the 3D tilt while the page scrolls caused dropped
    // frames (a lag/vibration illusion). Hold the float still during scroll
    // and resume shortly after the page settles.
    let resumeTimer = 0;

    window.addEventListener(
      'scroll',
      () => {
        tweens.forEach((tween) => tween.pause());
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
          tweens.forEach((tween) => tween.resume());
        }, 260);
      },
      { passive: true },
    );
  });
}

function initWordReveal(): void {
  if (REDUCED_MOTION.matches) {
    return;
  }

  const heading = document.querySelector<HTMLElement>('[data-words]');

  if (!heading) {
    return;
  }

  const words = heading.querySelectorAll<HTMLElement>('.split-word');

  if (!words.length) {
    return;
  }

  gsap.fromTo(
    words,
    { yPercent: 110, y: 0 },
    {
      yPercent: 0,
      y: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: heading,
        start: 'top 82%',
        once: true,
      },
    },
  );
}

function initReveals(): void {
  if (REDUCED_MOTION.matches) {
    return;
  }

  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');

  if (!items.length) {
    return;
  }

  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.08,
        overwrite: true,
      });
    },
  });
}

function initImageReveals(): void {
  if (REDUCED_MOTION.matches) {
    return;
  }

  const items = gsap.utils
    .toArray<HTMLElement>('[data-image-reveal]')
    .filter((item) => !item.classList.contains('hero-visual__media'));

  if (!items.length) {
    return;
  }

  ScrollTrigger.batch(items, {
    start: 'top 86%',
    once: true,
    onEnter: (batch) => {
      const inners = batch
        .map((item) => item.querySelector<HTMLElement>('[data-image-inner]'))
        .filter((item): item is HTMLElement => Boolean(item));

      gsap.to(inners, {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.15,
        ease: 'power4.out',
        stagger: 0.08,
        overwrite: true,
      });
    },
  });
}

function initServicesPin(): void {
  if (REDUCED_MOTION.matches) {
    return;
  }

  const media = gsap.matchMedia();

  media.add('(min-width: 1024px)', () => {
    const section = document.querySelector<HTMLElement>('#servicios');
    const intro = document.querySelector<HTMLElement>('[data-services-intro]');
    const list = section?.querySelector<HTMLElement>('[data-services-list]');

    if (!section || !intro || !list) {
      return;
    }

    const pin = ScrollTrigger.create({
      trigger: intro,
      start: 'top 96px',
      endTrigger: list,
      end: 'bottom 72%',
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      pin.kill();
    };
  });

  const fill = document.querySelector<HTMLElement>('[data-service-progress]');
  const list = document.querySelector<HTMLElement>('[data-services-list]');

  if (fill && list) {
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: list,
          start: 'top 65%',
          end: 'bottom 80%',
          scrub: 0.6,
        },
      },
    );
  }
}

function initFooterReveal(): void {
  if (REDUCED_MOTION.matches) {
    return;
  }

  const footer = document.querySelector<HTMLElement>('.site-footer');
  const wordmark = document.querySelector<HTMLElement>('.footer-wordmark');

  if (!footer || !wordmark) {
    return;
  }

  gsap.fromTo(
    wordmark,
    { yPercent: 12, opacity: 0.65 },
    {
      yPercent: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: footer,
        start: 'top 92%',
        end: 'top 58%',
        scrub: 0.8,
      },
    },
  );
}

export function initMotion(): void {
  const root = document.documentElement;
  const motionWindow = window as MotionWindow;

  if (motionWindow.__muaMotionFallback) {
    window.clearTimeout(motionWindow.__muaMotionFallback);
  }

  root.classList.remove('motion-failed');

  if (REDUCED_MOTION.matches) {
    return;
  }

  const lenis = initSmoothScroll();
  initAnchorScrolling(lenis);
  initHero();
  initHeroFloat();
  initWordReveal();
  initReveals();
  initImageReveals();
  initServicesPin();
  initFooterReveal();

  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });

  window.addEventListener('load', () => {
    ScrollTrigger.refresh();
  });
}
