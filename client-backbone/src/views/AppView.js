import Backbone from 'backbone';
import { buyCorn, getClientId } from '../services/api';
import { CornBasketModel } from '../models/CornBasketModel';
import { BuyStateModel } from '../models/BuyStateModel';
import { AppNavView } from './AppNavView';
import { BannerView } from './BannerView';
import { CornCounterView } from './CornCounterView';
import { StatusBlockView } from './StatusBlockView';
import { BuyCornButtonView } from './BuyCornButtonView';
import { ClientIdBadgeView } from './ClientIdBadgeView';

/**
 * Main app view - orchestrates models, views, and buy corn flow.
 */
export const AppView = Backbone.View.extend({
  el: '#app',

  initialize() {
    this.cornBasket = new CornBasketModel();
    this.buyState = new BuyStateModel();
  },

  async handleBuyCorn() {
    this.buyState.set({ status: 'loading', message: '', retryAfter: null, statusCode: null });

    const result = await buyCorn();

    if (result.success) {
      this.cornBasket.increment(1);
      this.buyState.set({
        status: 'success',
        message: 'Corn purchased!',
        retryAfter: null,
        statusCode: result.statusCode,
      });
    } else if (result.retryAfterSeconds != null) {
      this.buyState.set({
        status: 'rateLimited',
        message: result.error || 'Please wait before buying again.',
        retryAfter: result.retryAfterSeconds,
        statusCode: result.statusCode,
      });
    } else {
      this.buyState.set({
        status: 'error',
        message: result.error || 'Something went wrong.',
        retryAfter: null,
        statusCode: result.statusCode,
      });
    }
  },

  render() {
    this.$el.html(`
      <div class="h-screen flex flex-col bg-white">
        <div class="sticky top-0 z-10 shrink-0 w-full bg-white border-b border-gray-200 shadow-sm">
          <div id="app-nav" class="px-16 py-3 sm:py-4 flex flex-wrap items-center justify-between md:justify-start md:gap-4"></div>
        </div>
        <div class="flex-1 flex flex-col min-h-0 overflow-auto px-4 sm:px-6">
          <div class="max-w-5xl mx-auto flex-1 flex flex-col min-h-0 w-full">
            <main id="shop" class="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 md:items-stretch h-full min-h-0">
              <div class="flex flex-col min-h-[280px] sm:min-h-[360px] md:min-h-0 md:h-full md:col-span-8">
                <div id="banner" class="relative flex-1 min-h-0 overflow-hidden bg-gray-100 border border-gray-200 w-full"></div>
              </div>
            <div class="flex flex-col md:justify-center md:col-span-4">
              <div class="bg-gray-50 rounded-xl border border-gray-200 p-6 sm:p-10">
                <div id="corn-counter" class="text-center mb-10"></div>
                <div id="client-badge" class="text-center text-gray-500 text-xs mt-8 font-mono truncate max-w-full px-4"></div>
              </div>
              <div class="mt-4" id="status-block"></div>
              <div class="mt-4">
                <div id="buy-button"></div>
                <div class="mt-6 flex gap-2 text-gray-500 text-sm leading-relaxed">
                  <span class="shrink-0 mt-0.5" aria-hidden>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  <p>
                    <strong class="font-semibold text-gray-700">Policy: Bob is a fair farmer.</strong> He sells at most 1 corn per client per minute. Clients buy by sending a POST request to the API: 200 on success, 429 Too Many Requests if over the limit. Wait for the countdown before trying again.
                  </p>
                </div>
              </div>
            </div>
            </main>
          </div>
        </div>
        <footer class="shrink-0 w-full py-4 px-4 sm:px-6 bg-white border-t border-gray-200">
          <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-gray-500 text-sm">
            <span>©2026 Bob's Corn. CHALLENGE.</span>
            <a href="https://github.com/yeikol2703" target="_blank" rel="noopener noreferrer" class="hover:underline font-medium hover:text-[rgb(244,202,37)]">Yeikol Villalobos · GitHub</a>
          </div>
        </footer>
      </div>
    `);

    const appNavView = new AppNavView({ el: this.$el.find('#app-nav')[0] });
    const bannerView = new BannerView({ el: this.$el.find('#banner')[0] });
    const statusBlockView = new StatusBlockView({ el: this.$el.find('#status-block')[0], model: this.buyState });

    const cornCounterView = new CornCounterView({
      model: this.cornBasket,
    });

    const buyButtonView = new BuyCornButtonView({
      model: this.buyState,
      onBuy: () => this.handleBuyCorn(),
    });

    const clientBadgeView = new ClientIdBadgeView({
      clientId: getClientId(),
    });

    appNavView.render();
    bannerView.render();
    cornCounterView.setElement(this.$el.find('#corn-counter')[0]);
    buyButtonView.setElement(this.$el.find('#buy-button')[0]);
    clientBadgeView.setElement(this.$el.find('#client-badge')[0]);

    cornCounterView.render();
    statusBlockView.render();
    buyButtonView.render();
    clientBadgeView.render();

    this.listenTo(this.cornBasket, 'change', () => cornCounterView.render());
    this.listenTo(this.buyState, 'change', () => statusBlockView.render());

    return this;
  },
});
