var Vue = require('vue');

var marked = require('marked');

Vue.elementDirective('markdown', {
  bind() {
    this.el.className = 'markdown';
    this.el.innerHTML = marked(this.el.innerHTML);
  }
});

export default {};