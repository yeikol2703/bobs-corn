import Backbone from 'backbone';

/**
 * Top app bar: logo + "Bob's Corn", menu (Shop = main, Repository, Documentation), GitHub. Responsive with mobile menu.
 */
export const AppNavView = Backbone.View.extend({
  tagName: 'div',

  events: {
    'click [data-nav-toggle]': 'onToggleMenu',
    'click .nav-link': 'onNavClick',
  },

  template() {
    return `
      <a href="/" class="flex items-center gap-2 shrink-0" aria-label="Bob's Corn home">
        <span class="flex items-center justify-center rounded-lg border border-[rgb(244_202_37/0.5)] bg-[rgb(244_202_37/var(--tw-bg-opacity,1))] p-1.5 hover:brightness-95 transition-colors">
          <img src="/corn-icon.png" alt="" class="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
        </span>
        <span class="font-display text-xl sm:text-2xl text-gray-900 whitespace-nowrap">Bob's Corn</span>
      </a>
      <nav id="app-nav-menu" class="nav-menu md:flex-1 flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-0 md:gap-6 absolute md:relative left-0 right-0 md:left-auto md:right-auto top-full md:top-auto bg-white md:bg-transparent border-b md:border-b-0 border-gray-200 shadow-md md:shadow-none py-3 md:py-0 px-4 md:px-0 hidden md:flex" aria-label="Main">
          <a href="/" class="nav-link text-gray-600 hover:text-gray-900 font-medium text-sm py-3 md:py-0 border-b border-gray-100 last:border-b-0 md:border-b-0">Shop</a>
          <a href="https://github.com/yeikol2703/bobs-corn" target="_blank" rel="noopener noreferrer" class="nav-link text-gray-600 hover:text-gray-900 font-medium text-sm py-3 md:py-0 border-b border-gray-100 last:border-b-0 md:border-b-0">Repository</a>
          <a href="#documentation" class="nav-link text-gray-600 hover:text-gray-900 font-medium text-sm py-3 md:py-0 border-b border-gray-100 last:border-b-0 md:border-b-0">Documentation</a>
        </nav>
      <div class="flex items-center gap-1 sm:gap-2 shrink-0">
        <a href="https://github.com/yeikol2703" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0" aria-label="GitHub profile">
          <span class="flex items-center gap-1.5 text-sm">
            <span class="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden></span>
            <span class="text-green-600 font-medium">online</span>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" class="w-5 h-5 sm:w-6 sm:h-6">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
        <button type="button" data-nav-toggle class="md:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Toggle menu">
          <svg id="nav-icon-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg id="nav-icon-close" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6 hidden">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;
  },

  render() {
    this.el.innerHTML = this.template();
    this.menuOpen = false;
    return this;
  },

  onToggleMenu(e) {
    e.preventDefault();
    this.menuOpen = !this.menuOpen;
    const menu = this.el.querySelector('#app-nav-menu');
    const iconMenu = this.el.querySelector('#nav-icon-menu');
    const iconClose = this.el.querySelector('#nav-icon-close');
    const isMobile = window.innerWidth < 768;
    if (menu) {
      if (this.menuOpen) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
      } else if (isMobile) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
      }
    }
    if (iconMenu) iconMenu.classList.toggle('hidden', this.menuOpen);
    if (iconClose) iconClose.classList.toggle('hidden', !this.menuOpen);
  },

  onNavClick() {
    this.menuOpen = false;
    const menu = this.el.querySelector('#app-nav-menu');
    const iconMenu = this.el.querySelector('#nav-icon-menu');
    const iconClose = this.el.querySelector('#nav-icon-close');
    const isMobile = window.innerWidth < 768;
    if (menu && isMobile) {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
    }
    if (iconMenu) iconMenu.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
  },
});
