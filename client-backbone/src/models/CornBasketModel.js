import Backbone from 'backbone';

const STORAGE_KEY = 'bobs-corn-corn-count';

/**
 * Model for corn count with localStorage persistence.
 */
export const CornBasketModel = Backbone.Model.extend({
  defaults: {
    count: 0,
  },

  initialize() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      this.set('count', parseInt(stored, 10) || 0);
    }
    this.on('change:count', this._persist, this);
  },

  _persist() {
    localStorage.setItem(STORAGE_KEY, String(this.get('count')));
  },

  increment(amount = 1) {
    this.set('count', this.get('count') + amount);
  },
});
