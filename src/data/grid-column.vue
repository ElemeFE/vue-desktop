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
      sortable: {
        type: Boolean
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
        this.$parent.reRender();
      }
    },

    ready() {
      if (this.sortable === undefined) {
        this.sortable = !this.property;
      }

      var property = this.property;
      var label = this.label;

      var parent = this.$parent;
      var schema = parent.gridSchema;

      if (property && schema && !label) {
        this.label = label = schema.getPropertyLabel(property);
      }

      var width = this.width;

      if (width) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      var headerTemplate;
      var template = this.template;
      var type = this.type;

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
        if ((!template || /^\s*$/.test(template)) && property) {
          template = `{{ $getPropertyText(row, '${property}') }}`;
        }
      }

      var columnId = parent.gridId + 'column_' + columnIdSeed++;
      this.columnId = columnId;

      parent.columns.push({
        id: columnId,
        label: label,
        headerTemplate: headerTemplate,
        property: property,
        width: width,
        realWidth: width,
        direction: '',
        sortable: this.sortable,
        type: type,
        template: template
      });

      if (parent.$ready) {
        parent.reRender();
      }
    }
  }
</script>