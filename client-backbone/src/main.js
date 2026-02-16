import $ from 'jquery';
import Backbone from 'backbone';
import { AppView } from './views/AppView';
import './index.css';

// Backbone requires jQuery for View and Ajax
Backbone.$ = $;

function init() {
  const app = new AppView();
  app.render();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
