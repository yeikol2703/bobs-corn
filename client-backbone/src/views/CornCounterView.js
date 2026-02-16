import Backbone from 'backbone';

/**
 * Corn counter component.
 */
export const CornCounterView = Backbone.View.extend({
  tagName: 'div',
  className: 'text-center mb-10',

  template(count) {
    return `
      <p class="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
        Corn in your basket
      </p>
      <div class="flex items-center justify-center gap-3">
        <span class="text-6xl text-gray-900">${count}</span>
        <img src="/corn-icon.png" alt="" class="w-12 h-12 object-contain" aria-hidden />
      </div>
    `;
  },

  render() {
    const count = this.model?.get('count') ?? this.options.count ?? 0;
    this.el.innerHTML = this.template(count);
    return this;
  },
});
