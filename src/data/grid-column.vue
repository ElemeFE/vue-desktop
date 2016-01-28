<template>
  <div><slot></slot></div>
</template>

<script type="text/ecmascript-6">
  let columnIdSeed = 1;

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
      },
      resizable: {
        type: Boolean,
        default: true
      },
      formatter: {
        type: Function
      }
    },

    data() {
      return {
        template: null,
        isChildColumn: false,
        columns: []
      }
    },

    created() {
      this.columnId = (this.$parent.gridId || (this.$parent.columnId + '_')) + 'column_' + columnIdSeed++;

      let parent = this.$parent;
      let grid = parent;

      if (!parent.gridId) {
        this.isChildColumn = true;
        let current = parent;
        while (current) {
          if (current.gridId) {
            grid = current;
            break;
          }
          current = current.$parent;
        }
      }

      let property = this.property;

      if (this.sortable === undefined) {
        this.sortable = !!property;
      }

      let label = this.label;
      let schema = (grid || parent).gridSchema;

      if (property && schema && !label) {
        this.label = label = schema.getPropertyLabel(property);
      }

      let width = this.width;
      if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      let minWidth = this.minWidth;
      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);
        if (isNaN(minWidth)) {
          minWidth = 80;
        }
      } else {
        minWidth = 80;
      }

      let columnId = this.columnId;
      let type = this.type;

      this.columnConfig = {
        id: columnId,
        label: label,
        property: property,
        minWidth: minWidth,
        width: width,
        realWidth: width || minWidth,
        direction: '',
        sortable: this.sortable,
        resizable: this.resizable,
        type: type,
        formatter: this.formatter
      };
    },

    beforeCompile() {
      let options = this.$options;

      let tagName = this.$options.el.tagName.toLowerCase();
      let isColumnGroup = false;

      if (options._content) {
        let content = options._content.innerHTML;
        if (content.indexOf(`</${tagName}>`) === -1) {
          options._content = null;
          this.template = content;
        } else {
          this.template = null;
          isColumnGroup = true;
        }
      }

      let width = this.width;
      let type = this.type;
      let property = this.property;
      let columnId = this.columnId;
      let template = this.template;
      let headerTemplate;
      let columnConfig = this.columnConfig;

      if (type === 'selection') {
        headerTemplate = '<input type="checkbox" @click="$parent.toggleAllSelection($event)" />';
        template = '<input type="checkbox" @change="$parent.$parent.toggleSelection($event, row)" v-model="row.$selected"/>';
        if (!width) {
          columnConfig.minWidth = columnConfig.width = columnConfig.realWidth = 30;
          columnConfig.resizable = false;
        }
      } else if (type === 'index') {
        headerTemplate = '';
        template = '{{ $index + 1 }}';
        if (!width) {
          columnConfig.minWidth = columnConfig.width = columnConfig.realWidth = 30;
          columnConfig.resizable = false;
        }
      } else {
        if ((!template || /^\s*$/.test(template)) && property) {
          template = `{{ $getPropertyText(row, '${property}', '${columnId}') }}`;
        }
      }

      columnConfig.template = template;
      if (headerTemplate !== undefined) {
        columnConfig.headerTemplate = headerTemplate;
      }
      columnConfig.isColumnGroup = isColumnGroup;
    },

    detached() {
      let columns = this.$parent.columns;
      if (columns) {
        let columnId = this.columnId;
        for (let i = 0, j = columns.length; i < j; i++) {
          let column = columns[i];

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
      let parent = this.$parent;
      let columnConfig = this.columnConfig;
      let columnIndex;

      if (!this.isChildColumn) {
        columnIndex = [].indexOf.call(parent.$els.hiddenColumns.children, this.$el);
      }

      if (!this.isChildColumn) {
        parent.columns.splice(columnIndex, 0, columnConfig);
      } else {
        parent.columns.push(columnConfig);
        parent.columnConfig.columns = parent.columns;
      }

      if (parent.$ready) {
        parent.debouncedReRender();
      }
    }
  }
</script>