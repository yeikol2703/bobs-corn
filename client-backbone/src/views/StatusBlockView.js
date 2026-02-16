import Backbone from 'backbone';

/**
 * Status component.
 */
export const StatusBlockView = Backbone.View.extend({
  tagName: 'div',

  template({ status, message, retryAfter, statusCode }) {
    let text =
      status === 'idle'
        ? 'Ready to buy!'
        : status === 'loading'
          ? 'Buying...'
          : message || 'Ready to buy!';
    if (status === 'rateLimited' && retryAfter != null) {
      text = `${message || 'Please wait.'} Try again in ~${retryAfter}s`;
    }
    const colorClass =
      status === 'success' ? 'text-green-600' : status === 'rateLimited' || status === 'error' ? 'text-red-600' : 'text-gray-900';
    const label = statusCode != null ? `Status (${statusCode})` : 'Status';
    return `
      <p class="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">${label}</p>
      <p class="font-medium text-sm ${colorClass}">${text}</p>
    `;
  },

  initialize(options = {}) {
    this.model = options.model;
    if (this.model) this.listenTo(this.model, 'change', this.render);
  },

  render() {
    const model = this.model;
    const status = model?.get('status') ?? 'idle';
    const message = model?.get('message') ?? '';
    const retryAfter = model?.get('retryAfter') ?? null;
    const statusCode = model?.get('statusCode') ?? null;
    this.el.innerHTML = this.template({ status, message, retryAfter, statusCode });
    return this;
  },
});
