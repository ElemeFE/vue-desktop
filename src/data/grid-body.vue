<template>
  <div></div>
</template>

<style scoped>
</style>

<script type="text/ecmascript-6">
  import { getPath } from '../util';

  let isObject = function(obj) {
    return obj !== null && typeof obj === 'object';
  };

  export default {
    props: {
      columns: {},
      fixed: {}
    },

    created() {
      let columns = this.$options.columns;
      let rowTemplate = '';

      columns.forEach(function(column) {
        let columnTemplate = column.template || '';
        if (column.isColumnGroup) {
          let childColumns = column.columns;
          childColumns.forEach(function(childColumn) {
            columnTemplate = childColumn.template || '';
            rowTemplate += `<td class="${childColumn.id}"><div class="cell">${columnTemplate}</div></td>`;
          });
        } else {
          rowTemplate += `<td class="${column.id}"><div class="cell">${columnTemplate}</div></td>`;
        }
      });

      if (!this.$options.fixed) {
        rowTemplate += '<td class="gutter"></td>';
      }

      this.$options.template = '<tr v-for="row in $parent.data | orderBy $parent.sortingProperty $parent.sortingDirection" @click="handleClick(row)" @mouseenter="$parent.$parent.hoverRowIndex = $index" :class="{ \'current-row\': row === $parent.$parent.selected, hover: $parent.$parent.hoverRowIndex === $index }">' + rowTemplate + '</tr>';
    },

    filters: {
      orderBy(array, sortKey, reverse) {
        if (!sortKey) {
          return array;
        }
        var order = (reverse && reverse < 0) ? -1 : 1;

        // sort on a copy to avoid mutating original array
        return array.slice().sort(function(a, b) {
          if (sortKey !== '$key') {
            if (isObject(a) && '$value' in a) a = a.$value;
            if (isObject(b) && '$value' in b) b = b.$value;
          }
          a = isObject(a) ? getPath(a, sortKey) : a;
          b = isObject(b) ? getPath(b, sortKey) : b;
          return a === b ? 0 : a > b ? order : -order;
        });
      }
    },

    methods: {
      handleClick: function(row) {
        let grid = this.$parent;

        if (grid.selectionMode === 'single') {
          grid.selected = row;
          grid.$emit('selection-change', row);
        }
        grid.$emit('row-click', row);
      },

      $getPropertyText: function(row, property, columnId) {
        let grid = this.$parent;

        var column = null;
        grid.columns.forEach(function(item) {
          if (item.id === columnId) {
            column = item;
          }
        });

        if (column && column.formatter) {
          return column.formatter(row, column);
        }

        var schema = grid.gridSchema;
        if (schema) {
          var mapping = schema.getPropertyMapping(property);
          if (mapping) {
            return schema.translateProperty(property, getPath(row, property));
          }
          return schema.getPropertyText(row, property);
        }

        return getPath(row, property);
      }
    }
  };
</script>