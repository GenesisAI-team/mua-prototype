const MENU_EVENT = 'mua:menu';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  const menu = document.querySelector<HTMLDialogElement>('[data-menu]');
  const openButton = document.querySelector<HTMLButtonElement>('[data-menu-open]');
  const closeButton = document.querySelector<HTMLButtonElement>('[data-menu-close]');
  const root = document.documentElement;

  let lastY = window.scrollY;

  const syncHeader = () => {
    const y = window.scrollY;
    header?.classList.toggle('is-scrolled', y > 8);

    if (header && !menu?.open) {
      const goingDown = y > lastY && y > 160;
      header.classList.toggle('is-hidden', goingDown);
    }

    lastY = y;
  };

  const openMenu = () => {
    if (!menu || !openButton || menu.open) {
      return;
    }

    menu.showModal();
    openButton.setAttribute('aria-expanded', 'true');
    root.classList.add('menu-open');
    window.setTimeout(() => closeButton?.focus(), 0);
    document.dispatchEvent(
      new CustomEvent(MENU_EVENT, { detail: { open: true } }),
    );
  };

  const closeMenu = () => {
    if (!menu?.open) {
      return;
    }

    menu.close();
  };

  const onMenuClosed = () => {
    openButton?.setAttribute('aria-expanded', 'false');
    root.classList.remove('menu-open');
    openButton?.focus();
    document.dispatchEvent(
      new CustomEvent(MENU_EVENT, { detail: { open: false } }),
    );
  };

  openButton?.addEventListener('click', openMenu);
  closeButton?.addEventListener('click', closeMenu);

  menu?.addEventListener('close', onMenuClosed);
  menu?.addEventListener('click', (event) => {
    if (event.target === menu) {
      closeMenu();
    }
  });

  menu?.querySelectorAll<HTMLAnchorElement>('[data-menu-link]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
}
