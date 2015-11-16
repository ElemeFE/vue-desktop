<style>
  .d-grid {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    background-color: transparent;
    border-collapse: collapse;
    /*border: 1px solid #ddd;*/
    font-size: 14px;
  }

  .d-grid-fit {
    border-right: 0;
  }

  .d-grid th {
    background: #fff;
  }

  .d-grid th,
  .d-grid td {
    height: 20px;
    max-width: 250px;
    padding: 2px;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 28px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
    border-bottom: 1px solid #ddd;
  }

  .d-grid th {
    background-color: #f2f2f2;
  }

  .d-grid .grid-fixed-header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
  }

  .d-grid .grid-fixed-body-wrapper {
    position: absolute;
    left: 0;
    top: 37px;
    overflow: hidden;
  }

  .d-grid .grid-fixed-body-wrapper tr {
    background: #fff;
  }

  .d-grid .grid-header-wrapper,
  .d-grid .grid-body-wrapper {
    width: 100%;
  }

  .d-grid .grid-header,
  .d-grid .grid-body {
    table-layout: fixed;
  }

  .d-grid .grid-header-wrapper {
    overflow: hidden;
  }

  .d-grid .grid-body-wrapper {
    overflow: auto;
    position: relative;
  }

  .d-grid td,
  .d-grid th {
    position: relative;
    /*border-right: 1px solid #ddd;*/
  }

  /** TODO */
  .d-grid th.required > div:before {
    display: inline-block;
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff4d51;
    margin-right: 5px;
    vertical-align: middle;
  }

  .d-grid th > .cell {
    position: relative;
    word-wrap: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    line-height: 20px;
    vertical-align: middle;
    width: 100%;
  }

  /** TODO */
  .d-grid .sort-caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 0.3em;
    border: 0;
    content: "";
    position: absolute;
    z-index: 2;
    top: 16px;
    right: 4px;
  }

  .d-grid .ascending .sort-caret {
    vertical-align: baseline;
    border-top: none;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #000000;
    border-left: 4px solid transparent;
  }

  .d-grid .descending .sort-caret {
    vertical-align: super;
    border-top: 4px solid #000000;
    border-right: 4px solid transparent;
    border-bottom: none;
    border-left: 4px solid transparent;
  }

  .d-grid th.gutter,
  .d-grid td.gutter {
    width: 15px;
    border-right-width: 0;
    padding: 0;
  }

  .d-grid-fit th.gutter,
  .d-grid-fit td.gutter {
    border-right-width: 1px;
  }

  .d-grid td .cell {
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 28px;
  }

  .d-grid tr:nth-child(2n) {
    background: #f9f9f9;
  }

  .d-grid tr.current-row {
    background: #90c9ff;
  }

  .d-grid tr:last-child td {
    border-bottom: 0;
  }
</style>

<template>
  <div class="d-grid" :class="{ 'd-grid-fit': fit }">
    <slot></slot>
    <div class="grid-header-wrapper">
      <table class="grid-header" cellspacing="0" cellpadding="0" border="0" :style="{ width: bodyWidth ? bodyWidth + 'px' : '' }">
        <thead></thead>
      </table>
    </div>
    <div class="grid-body-wrapper">
      <table class="grid-body" cellspacing="0" cellpadding="0" border="0" :style="{ width: bodyWidth ? bodyWidth + 'px' : '' }">
        <tbody></tbody>
      </table>
    </div>
    <div class="grid-fixed-header-wrapper" v-if="fixedColumnCount > 0">
      <table class="grid-header" cellspacing="0" cellpadding="0" border="0" :style="{ width: fixedBodyWidth ? fixedBodyWidth + 'px' : '' }">
        <thead></thead>
      </table>
    </div>
    <div class="grid-fixed-body-wrapper" v-if="fixedColumnCount > 0">
      <table class="grid-body" cellspacing="0" cellpadding="0" border="0" :style="{ width: fixedBodyWidth ? fixedBodyWidth + 'px' : '' }">
        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  var Vue = require('vue');
  var throttle = require('../util').throttle;
  var SchemaStore = require('../schema/store');

  var gridIdSeed = 1;
  var GUTTER_WIDTH = 15;

  require('./grid-column');

  export default {
    props: {
      data: {
        type: Array,
        default: function() {
          return []
        }
      },

      schema: {},

      width: {
        type: String
      },

      height: {
        type: String
      },

      fit: {
        type: Boolean,
        default: true
      },

      fitColumns: {
        type: Boolean,
        default: true
      },

      fixedColumnCount: {
        type: Number,
        default: 0
      },

      columns: {
        type: Array,
        default: function() {
          return [];
        }
      },

      selection: {
        type: Array,
        default: function() {
          return [];
        }
      }
    },

    events: {
      onresize() {
        var grid = this;
        Vue.nextTick(function() {
          grid.height = grid.$el.offsetHeight;
        });
      }
    },

    methods: {
      toggleSelection(event, row) {
        var target = event.target;
        Vue.set(row, '$selected', target.checked);
      },

      toggleAllSelection(event) {
        var target = event.target;
        var checked = target.checked;
        this.data.forEach(function(item) {
          Vue.set(item, '$selected', checked);
        });
      },

      $calcColumns() {
        var fit = this.fit;
        var fitColumns = this.fitColumns;
        var columns = this.columns;

        var bodyWidth;
        if (fit) {
          bodyWidth = this.$el.clientWidth;

          if (fitColumns) {
            var flexColumns = [];
            var hasWidthColumnWidth = 0;
            columns.forEach(function(column) {
              if (typeof column.width === 'number') {
                hasWidthColumnWidth += column.width;
              } else {
                flexColumns.push(column);
              }
            });

            if (flexColumns.length) {
              var flexWidth = (bodyWidth - GUTTER_WIDTH - hasWidthColumnWidth - columns.length) / flexColumns.length;
              flexColumns.forEach(function(column) {
                column.realWidth = flexWidth;
              });
            }
          }
        } else {
          bodyWidth = 0;

          columns.forEach(function(column) {
            if (!column.width) {
              column.realWidth = 80;
            }
            bodyWidth += column.realWidth;
          });
        }

        if (this.styleNode) {
          var styleSheet = this.styleNode.sheet;

          for (var i = 0, j = styleSheet.cssRules.length; i < j; i++) {
            styleSheet.deleteRule(0);
          }

          columns.forEach(function(column) {
            styleSheet.insertRule(`.${column.id} { width: ${column.realWidth}px; }`, styleSheet.cssRules.length);
          });
        }

        if (this.fixedColumnCount > 0) {
          var fixedBodyWidth = 0;
          var fixedColumnCount = this.fixedColumnCount;

          columns.forEach(function(column, index) {
            if (index < fixedColumnCount) {
              fixedBodyWidth += column.realWidth;
            }
          });

          this.fixedBodyWidth = fixedBodyWidth;
        }

        this.bodyWidth = bodyWidth;
      },

      $calcHeight(height) {
        if (typeof height === 'string') {
          if (/^\d+$/.test(height)) {
            height = Number(height);
          }
        }

        if (!isNaN(height)) {
          var headerHeight = this.$el.querySelector('.grid-header-wrapper').offsetHeight;
          var bodyHeight = (height - headerHeight) + 'px';

          this.$el.querySelector('.grid-body-wrapper').style.height = bodyHeight;

          var fixedBodyWrapper = this.$el.querySelector('.grid-fixed-body-wrapper');
          if (fixedBodyWrapper) {
            fixedBodyWrapper.style.height = bodyHeight;
          }
        }
      },

      handleHeaderClick(column) {
        if (!column.sortable) return;

        if (this.sortingColumn !== column) {
          if (this.sortingColumn) {
            this.sortingColumn.direction = '';
          }
          this.sortingColumn = column;
          this.sortingProperty = column.property;
        }

        if (!column.direction) {
          column.direction = 'ascending'
        } else if (column.direction === 'ascending') {
          column.direction = 'descending';
        } else {
          column.direction = '';
        }
        this.sortingDirection = column.direction === 'descending' ? -1 : 1;
      },

      $renderHeader(fixed) {
        var columns = fixed ? this.fixedColumns : this.columns;
        if (fixed) {
          if (columns.length === 0) return;
        }
        var rowTemplate = '';

        columns.forEach(function (column, index) {
          var columnTemplate = column.headerTemplate || `{{ columns[${index}].label }}`;
          rowTemplate += `<th @click="$parent.handleHeaderClick(columns[${index}])" class="{{ columns[${index}].id }} {{ columns[${index}].direction }}" ><div>${ columnTemplate }</div><i class="sort-caret"></i></th>`;
        });

        if (!fixed) {
          rowTemplate += '<th class="gutter">&nbsp;</th>';
        }

        var repeatTemplate = '<tr>' + rowTemplate + '</tr>';

        var headerTable = this.$el.querySelector(fixed ? '.grid-fixed-header-wrapper thead' : '.grid-header thead');

        this.$head = new Vue({
          parent: this,
          el: headerTable,
          template: repeatTemplate,
          replace: false,
          data: {
            columns: columns
          }
        });
      },

      $renderBody(fixed) {
        var columns = fixed ? this.fixedColumns : this.columns;
        if (fixed && columns.length === 0) return;
        var rowTemplate = '';

        columns.forEach(function (column) {
          var columnTemplate = column.template || '';
          rowTemplate += `<td class="${column.id}"><div class="cell">${columnTemplate}</div></td>`;
        });

        if (!fixed) {
          rowTemplate += '<td class="gutter"></td>';
        }

        var repeatTemplate = '<tr v-for="row in $parent.data | orderBy $parent.sortingProperty $parent.sortingDirection" @click="handleClick(row)">' + rowTemplate + '</tr>';

        var bodyTable = this.$el.querySelector(fixed ? '.grid-fixed-body-wrapper tbody' : '.grid-body tbody');

        var grid = this;

        this.$body = new Vue({
          parent: this,
          inherit: true,
          el: bodyTable,
          template: repeatTemplate,
          replace: false,
          methods: {
            handleClick: function(row) {
              grid.$emit('row-click', row);
            },
            $getPropertyText: function(row, property) {
              var schema = grid.gridSchema;
              if (schema) {
                var mapping = schema.getPropertyMapping(property);
                if (mapping) {
                  return schema.translateProperty(row, property);
                }
                return schema.getPropertyText(row, property);
              }
              return row[property];
            }
          }
        });
      }
    },

    created() {
      this.gridId = 'grid_' + gridIdSeed + '_';
    },

    computed: {
      selection() {
        var data = this.data || [];
        return data.filter(function(item) {
          return item.$selected === true;
        });
      },

      fixedColumns() {
        var columns = this.columns || [];
        var fixedColumnCount = this.fixedColumnCount;
        return columns.filter(function(item, index) {
          return index < fixedColumnCount;
        });
      },

      gridSchema() {
        var schema = this.schema;

        if (typeof schema === 'string') {
          schema = SchemaStore.getSchema(schema);
        }

        return typeof schema === 'string' ? null : schema;
      }
    },

    watch: {
      height(value) {
        this.$calcHeight(value);
      }
    },

    beforeCompile() {
      var styleNode = document.createElement('style');
      styleNode.type = 'text/css';
      styleNode.rel = 'stylesheet';
      styleNode.title = 'Grid Column Style';
      document.getElementsByTagName('head')[0].appendChild(styleNode);

      this.styleNode = styleNode;
    },

    destroyed() {
      if (this.styleNode) {
        this.styleNode.parentNode.removeChild(this.styleNode);
      }
    },

    ready() {
      var bodyWrapper = this.$el.querySelector('.grid-body-wrapper');
      var headerWrapper = this.$el.querySelector('.grid-header-wrapper');
      var fixedBodyWrapper = this.$el.querySelector('.grid-fixed-body-wrapper');

      bodyWrapper.addEventListener('scroll', function() {
        headerWrapper.scrollLeft = this.scrollLeft;
        if (fixedBodyWrapper) {
          fixedBodyWrapper.scrollTop = this.scrollTop;
        }
      });

      this.$calcColumns();

      var self = this;
      if (this.fit) {
        window.addEventListener('resize', throttle(function() {
          self.$calcColumns();
        }, 200));
      }

      this.$renderHeader();
      this.$renderBody();
      this.$renderHeader(true);
      this.$renderBody(true);

      Vue.nextTick(function() {
        if (self.height) {
          self.$calcHeight(self.height);
        }
      });
    },

    data() {
      return {
        bodyWidth: '',
        fixedBodyWidth: '',
        sortingColumn: null,
        sortingProperty: null,
        sortingDirection: 1
      };
    }
  };
</script>