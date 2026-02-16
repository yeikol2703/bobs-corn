import Backbone from 'backbone';

/**
 * Buy corn button and status display.
 */
export const BuyCornButtonView = Backbone.View.extend({
  tagName: 'div',
  className: 'flex flex-col items-center gap-4',

  events: {
    'click [data-buy-corn]': 'onBuyClick',
  },

  template({ status }) {
    const buttonLabel = status === 'loading' ? 'Buying...' : 'Buy Corn <img src="/corn-icon.png" alt="" class="w-5 h-5 inline-block align-middle object-contain" aria-hidden />';
    const disabled = status === 'loading' ? 'disabled' : '';
    return `
      <div class="flex flex-col items-center w-full">
        <button
          data-buy-corn
          ${disabled}
          class="w-full max-w-md py-4 bg-[rgb(244_202_37/var(--tw-bg-opacity,1))] hover:brightness-95 disabled:opacity-60 disabled:brightness-100 disabled:cursor-not-allowed text-black font-semibold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(244,202,37,0.4)] transition-all duration-200 text-lg inline-flex items-center justify-center gap-2"
        >
          ${buttonLabel}
        </button>
      </div>
    `;
  },

  initialize(options = {}) {
    this.model = options.model;
    this.onBuy = options.onBuy;
    if (this.model) {
      this.listenTo(this.model, 'change', this.render);
    }
  },

  render() {
    if (!this.el) return this;
    const model = this.model;
    this.el.innerHTML = this.template({
      status: model?.get('status') ?? 'idle',
    });
    return this;
  },

  onBuyClick(e) {
    e.preventDefault();
    if (this.model?.get('status') === 'loading') return;
    this.onBuy?.();
  },
});
