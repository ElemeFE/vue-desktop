<template>
  <div></div>
</template>

<style scoped>
</style>

<script type="text/ecmascript-6">
  import { getPath } from '../util';

  const isObject = function(obj) {
    return obj !== null && typeof obj === 'object';
  };

  const getCell = function(event) {
    let cell = event.target;

    while (cell && cell.tagName.toUpperCase() !== 'HTML') {
      if (cell.tagName.toUpperCase() === 'TD') {
        return cell;
      }
      cell = cell.parentNode;
    }

    return null;
  };

  const getColumnById = function(grid, columnId) {
    let column = null;
    grid.columns.forEach(function(item) {
      if (item.id === columnId) {
        column = item;
      }
    });
    return column;
  };

  const getColumnByCell = function(grid, cell) {
    const matches = (cell.className || '').match(/grid_[^\s]+/gm);
    if (matches) {
      return getColumnById(grid, matches[0]);
    }
    return null;
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
            rowTemplate += `<td class="${childColumn.id}" @mouseenter="handleCellMouseEnter($event, row)" @mouseleave="handleCellMouseLeave($event)"><div class="cell">${columnTemplate}</div></td>`;
          });
        } else {
          rowTemplate += `<td class="${column.id}" @mouseenter="handleCellMouseEnter($event, row)" @mouseleave="handleCellMouseLeave($event)"><div class="cell">${columnTemplate}</div></td>`;
        }
      });

      if (!this.$options.fixed) {
        rowTemplate += '<td class="gutter"></td>';
      }

      this.$options.template = '<tr v-for="row in $parent.data | orderBy $parent.sortingProperty $parent.sortingDirection" ' +
        '@click="handleClick($event, row)" @mouseenter="handleMouseEnter($index)" ' +
        ':class="{ \'current-row\': row === $parent.$parent.selected, hover: $parent.$parent.hoverRowIndex === $index }">' +
        rowTemplate + '</tr>';
    },

    filters: {
      orderBy(array, sortKey, reverse) {
        if (!sortKey || this.$parent.sortingCustom) {
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
      handleCellMouseEnter(event, row) {
        let grid = this.$parent;
        const cell = getCell(event);

        if (cell) {
          const column = getColumnByCell(grid, cell);
          const hoverState = grid.hoverState = { cell: cell, column: column, row: row };
          grid.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
        }
      },

      handleCellMouseLeave(event) {
        let grid = this.$parent;
        const cell = getCell(event);

        if (cell) {
          const oldHoverState = grid.hoverState;
          grid.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
        }
      },

      handleMouseEnter(index) {
        let grid = this.$parent;
        grid.hoverRowIndex = index;
      },

      handleClick(event, row) {
        let grid = this.$parent;
        const cell = getCell(event);

        if (cell) {
          const column = getColumnByCell(grid, cell);
          if (column) {
            grid.$emit('cell-click', row, column, cell, event);
          }
        }

        if (grid.selectionMode === 'single') {
          grid.selected = row;
          grid.$emit('selection-change', row);
        }

        grid.$emit('row-click', row, event);
      },

      $getPropertyText(row, property, columnId) {
        let grid = this.$parent;

        const column = getColumnById(grid, columnId);

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
