import Vue from 'vue';
var Tooltip = Vue.extend(require('./tooltip.vue'));

Vue.directive('tooltip', {
  params: ['tooltip-content', 'tooltip-placement', 'tooltip-trigger', 'tooltip-delay'],
  paramWatchers: {
    tooltipContent(val) {
      if (this.instance) {
        this.instance.content = val;
      }
    }
  },
  bind() {
    var el = this.el;
    var placement = this.params.tooltipPlacement;
    var content = this.params.tooltipContent;
    var trigger = this.params.tooltipTrigger || 'mouseenter';
    var delay = parseInt(this.params.tooltipDelay, 10);

    if (trigger === 'mouseenter' && isNaN(delay)) {
      delay = 300;
    }

    if (!placement) placement = 'bottom';

    this.instance = new Tooltip({
      el: document.createElement('div')
    });

    this.instance.placement = placement;
    this.instance.content = content;
    this.instance.trigger = trigger;
    this.instance.target = el;
    this.instance.openDelay = delay;
    this.instance.bindTarget();
  }
});
