var columnIdSeed = 1;
var Vue = require('vue');

Vue.elementDirective('d-grid-column', {
  bind: function () {
    var el = this.el;
    var label = el.getAttribute('label') || '';
    var property = el.getAttribute('property') || '';
    var width = el.getAttribute('width') || '';
    var sortable = el.getAttribute('sortable');
    var type = el.getAttribute('type') || '';

    var schema = this._host.gridSchema;

    if (property && schema && !label) {
      label = schema.$getPropertyLabel(property);
    }

    if (sortable === 'true') {
      sortable = true;
    } else if (sortable === 'false') {
      sortable = false;
    } else {
      sortable = !!property;
    }

    if (width) {
      width = parseInt(width, 10);
      if (isNaN(width)) {
        width = null;
      }
    }

    var template = this.el.innerHTML || '';
    var headerTemplate;

    if (type === 'selection') {
      headerTemplate = '<input type="checkbox" @click="$parent.toggleAllSelection($event)" />';
      template = '<input type="checkbox" @change="$parent.$parent.toggleSelection($event, row)" v-model="row.$selected"/>';
      if (!width) {
        width = 30;
      }
    } else if (type === 'index') {
      headerTemplate = '';
      template = '{{ $index + 1 }}';
      if (!width) {
        width = 30;
      }
    } else {
      if (/^\s*$/.test(template) && property) {
        template = `{{ $getPropertyText(row, '${property}') }}`;
      }
    }

    var columnId = this._host.gridId + 'column_' + columnIdSeed++;

    this._host.columns.push({
      id: columnId,
      label: label,
      headerTemplate: headerTemplate,
      property: property,
      width: width,
      realWidth: width,
      direction: '',
      sortable: sortable,
      type: type,
      template: template
    });

    this.el.parentNode.removeChild(this.el);
  }
});