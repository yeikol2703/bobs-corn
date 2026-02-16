import Backbone from 'backbone';

/**
 * Client ID badge.
 */
export const ClientIdBadgeView = Backbone.View.extend({
  tagName: 'p',
  className: 'text-center text-gray-500 text-xs mt-8 font-mono truncate max-w-full px-4',

  initialize(options = {}) {
    this.options = options;
  },

  render() {
    const clientId = (this.options && this.options.clientId) || '--------';
    this.el.textContent = `Client: ${clientId.slice(0, 8)}…`;
    return this;
  },
});
