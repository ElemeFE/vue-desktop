import Vue from 'vue';
var Tooltip = Vue.extend(require('./tooltip.vue'));

Vue.directive('tooltip', {
  bind() {
    var el = this.el;
    var placement = el.getAttribute('tooltip-placement');
    var content = el.getAttribute('tooltip-content');
    var trigger = el.getAttribute('tooltip-trigger') || 'mouseenter';
    var delay = parseInt(el.getAttribute('tooltip-delay'), 10);

    if (trigger === 'mouseenter' && isNaN(delay)) {
      delay = 300;
    }

    if (!placement) placement = 'bottom';

    var instance = new Tooltip({
      el: document.createElement('div')
    });

    instance.placement = placement;
    instance.content = content;
    instance.trigger = trigger;
    instance.target = el;
    instance.openDelay = delay;
    instance.bindTarget();
  }
});