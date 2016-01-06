<template>
  <div><slot></slot></div>
</template>

<script type="text/ecmascript-6">
  var columnIdSeed = 1;

  export default {
    props: {
      type: {},
      label: {},
      property: {},
      width: {},
      minWidth: {},
      sortable: {
        type: Boolean,
        default: undefined
      }
    },

    data() {
      return {
        template: null
      }
    },

    beforeCompile() {
      // console.log(this.$parent, this.$parent.columns);
      var $options = this.$options;

      if ($options._content) {
        this.template = $options._content.innerHTML;
        $options._content = null;
      }
    },

    detached() {
      var columns = this.$parent.columns;
      if (columns) {
        var columnId = this.columnId;
        for (var i = 0, j = columns.length; i < j; i++) {
          var column = columns[i];

          if (column.id === columnId) {
            columns.splice(i, 1);
            break;
          }
        }
      }

      if (this.$parent.$ready) {
        this.$parent.debouncedReRender();
      }
    },

    ready() {
      var property = this.property;

      if (this.sortable === undefined) {
        this.sortable = !!property;
      }

      var label = this.label;
      var parent = this.$parent;
      var schema = parent.gridSchema;

      if (property && schema && !label) {
        this.label = label = schema.getPropertyLabel(property);
      }

      var width = this.width;
      if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      var minWidth = this.minWidth;
      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);
        if (isNaN(minWidth)) {
          minWidth = 80;
        }
      } else {
        minWidth = 80;
      }

      var headerTemplate;
      var template = this.template;
      var type = this.type;

      if (type === 'selection') {
        headerTemplate = '<input type="checkbox" @click="$parent.toggleAllSelection($event)" />';
        template = '<input type="checkbox" @change="$parent.$parent.toggleSelection($event, row)" v-model="row.$selected"/>';
        if (!width) {
          width = 30;
          minWidth = 30;
        }
      } else if (type === 'index') {
        headerTemplate = '';
        template = '{{ $index + 1 }}';
        if (!width) {
          width = 30;
          minWidth = 30;
        }
      } else {
        if ((!template || /^\s*$/.test(template)) && property) {
          template = `{{ $getPropertyText(row, '${property}') }}`;
        }
      }

      var columnId = parent.gridId + 'column_' + columnIdSeed++;
      this.columnId = columnId;

      var columnIndex = [].indexOf.call(parent.$els.hiddenColumns.children, this.$el);

      var columnConfig = {
        id: columnId,
        label: label,
        headerTemplate: headerTemplate,
        property: property,
        minWidth: minWidth,
        width: width,
        realWidth: width,
        direction: '',
        sortable: this.sortable,
        type: type,
        template: template
      };
      parent.columns.splice(columnIndex, 0, columnConfig);

      if (parent.$ready) {
        parent.debouncedReRender();
      }
    }
  }
</script>