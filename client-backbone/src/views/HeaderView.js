import Backbone from 'backbone';

/**
 * Header component.
 */
export const HeaderView = Backbone.View.extend({
  tagName: 'header',
  className: 'text-center mb-12',

  initialize(options = {}) {
    this.options = options;
  },

  template({ title, subtitle }) {
    return `
      <h1 class="font-display text-5xl text-amber-900 mb-2">${title}</h1>
      <p class="text-amber-700/80 text-lg">${subtitle}</p>
    `;
  },

  render() {
    const opts = this.options || {};
    this.el.innerHTML = this.template({
      title: opts.title || "Bob's Corn",
      subtitle:
        opts.subtitle ||
        "Fresh corn, one at a time. Bob's fair policy: 1 corn per client per minute.",
    });
    return this;
  },
});
