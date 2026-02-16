import Backbone from 'backbone';

/**
 * Left section
 */
export const BannerView = Backbone.View.extend({
  tagName: 'div',

  template() {
    return `
      <img src="/banner.png" alt="" class="absolute inset-0 w-full h-full object-cover object-center min-w-full min-h-full" aria-hidden loading="eager" />
      <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent flex flex-col gap-1">
        <span class="text-[3rem] font-semibold tracking-wide text-white/90">Bob Sell Corn</span>
        <p class="text-white text-sm leading-relaxed">You are helping a farmer named Bob sells corn 🌽.</p>
      </div>
    `;
  },

  render() {
    this.el.innerHTML = this.template();
    return this;
  },
});
