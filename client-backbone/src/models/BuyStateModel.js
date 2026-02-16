import Backbone from 'backbone';

/**
 * Model for buy corn flow state.
 */
export const BuyStateModel = Backbone.Model.extend({
  defaults: {
    status: 'idle',
    message: '',
    retryAfter: null,
    statusCode: null,
  },
});
