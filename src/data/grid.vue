<style>
  .d-grid {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    background-color: #fff;
    border-collapse: collapse;
    border: 1px solid #e7eaec;
    font-size: 14px;
    border-radius: 3px;
  }

  .hidden-columns {
    visibility: hidden;
    position: absolute;
    z-index: -1;
  }

  .d-grid-fit {
    border-right: 0;
  }

  .d-grid th,
  .d-grid td {
    height: 20px;
    max-width: 250px;
    min-width: 0;
    box-sizing: border-box;
    overflow: hidden;
    line-height: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .d-grid td {
    border-bottom: 1px solid #e7eaec;
  }

  .d-grid th {
    text-align: left;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }

  .d-grid th > div {
    display: inline-block;
    padding: 2px;
    box-sizing: border-box;
  }

  .d-grid td > div {
    padding: 2px;
  }

  .d-grid .grid-fixed-header-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
  }

  .d-grid .grid-fixed-body-wrapper {
    position: absolute;
    left: 0;
    top: 37px;
    overflow: hidden;
    z-index: 3;
  }

  .d-grid .grid-fixed-body-wrapper tr {
    /*background: #fff;*/
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
    border-right: 1px solid #e7eaec;
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
    top: 50%;
    margin-top: -3px;
    right: 4px;
  }

  .d-grid .ascending .sort-caret {
    vertical-align: baseline;
    border-top: none;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #333;
    border-left: 4px solid transparent;
  }

  .d-grid .descending .sort-caret {
    vertical-align: super;
    border-top: 4px solid #333;
    border-right: 4px solid transparent;
    border-bottom: none;
    border-left: 4px solid transparent;
  }

  .d-grid th.gutter,
  .d-grid td.gutter {
    width: 15px;
    border-right-width: 0;
    border-bottom-width: 0;
    padding: 0;
  }

  .d-grid td.gutter {
    width: 0;
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

  .d-grid tr {
    background-color: #fff;
  }

  .grid-body tr:nth-child(2n) {
    background: #f9f9f9;
  }

  .d-grid tr.current-row {
    background: #007fc1;
    color: #fff;
  }

  .d-grid tr.hover,
  .d-grid tr:hover {
  }

  .d-grid-column-resize-proxy {
    position: absolute;
    left: 200px;
    top: 0;
    bottom: 0;
    width: 0;
    border-left: 1px solid #aaa;
    z-index: 10;
  }
</style>

<template>
  <div class="d-grid" :class="{ 'd-grid-fit': fit }" @mouseleave="handleMouseLeave($event)">
    <div class="hidden-columns" v-el:hidden-columns></table><slot></slot></div>
    <div class="grid-header-wrapper">
      <table class="grid-header" cellspacing="0" cellpadding="0" border="0" :style="{ width: bodyWidth ? bodyWidth + 'px' : '' }">
      </table>
    </div>
    <div class="grid-body-wrapper">
      <table class="grid-body" cellspacing="0" cellpadding="0" border="0" :style="{ width: bodyWidth ? bodyWidth - (showVertScrollbar ? gutterWidth : 0 ) + 'px' : '' }">
        <tbody></tbody>
      </table>
    </div>
    <div class="grid-fixed-header-wrapper" v-if="fixedColumnCount > 0">
      <table class="grid-header" cellspacing="0" cellpadding="0" border="0" :style="{ width: fixedBodyWidth ? fixedBodyWidth + 'px' : '' }">
      </table>
    </div>
    <div class="grid-fixed-body-wrapper" v-if="fixedColumnCount > 0" :style="{ top: headerHeight + 'px' }">
      <table class="grid-body" cellspacing="0" cellpadding="0" border="0" :style="{ width: fixedBodyWidth ? fixedBodyWidth + 'px' : '' }">
        <tbody></tbody>
      </table>
    </div>
    <div class="d-grid-column-resize-proxy" v-el:resize-proxy v-show="resizeProxyVisible"></div>
    <slot name="bottom"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  const Vue = require('vue');

  import { merge, throttle, debounce, getScrollbarWidth } from '../util';
  import { default as SchemaStore } from '../schema/store';
  import { hasClass, removeClass } from 'wind-dom';

  let gridIdSeed = 1;
  let GUTTER_WIDTH;

  let GridBody = require('./grid-body.vue');
  let GridHeader = require('./grid-header.vue');

  export default {
    props: {
      data: {
        type: Array,
        default: function() {
          return [];
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

      fixedColumnCount: {
        type: Number,
        default: 0
      },

      selectionMode: {
        type: String,
        default: 'single'
      },

      selection: {},

      allowNoSelection: {
        type: Boolean,
        default: false
      },

      gutterWidth: {
        default: 0
      }
    },

    events: {
      onresize() {
        var grid = this;

        Vue.nextTick(function() {
          if (grid.$el.getAttribute('flex') !== null) {
            grid.height = grid.$el.offsetHeight;
          }
          grid.$calcColumns();
        });
      }
    },

    methods: {
      handleMouseLeave(event) {
        this.hoverRowIndex = null;
        const hoverState = this.hoverState;
        if (hoverState) {
          this.hoverState = null;
        }
      },

      handleDataChange(data) {
        data = data || [];

        if (this.selectionMode === 'single') {
          var oldSelection = this.selected;
          if (oldSelection === null) {
            if (!this.allowNoSelection) {
              this.selected = data[0];
              if (this.selected !== oldSelection) {
                this.$emit('selection-change', this.selected);
              }
            }
          } else if (data.indexOf(oldSelection) === -1) {
            if (!this.allowNoSelection) {
              this.selected = data[0];
            } else {
              this.selected = null;
            }
            if (this.selected !== oldSelection) {
              this.$emit('selection-change', this.selected);
            }
          }
        }
      },

      toggleSelection(event, row) {
        var target = event.target;
        Vue.set(row, '$selected', target.checked);
        if (this.selectionMode === 'multiple') {
          this.$emit('selection-change', this.selection);
        }
      },

      toggleAllSelection(event) {
        var target = event.target;
        var checked = target.checked;
        this.data.forEach(function(item) {
          Vue.set(item, '$selected', checked);
        });
        if (this.selectionMode === 'multiple') {
          this.$emit('selection-change', this.selection);
        }
      },

      $calcColumns() {
        let fit = this.fit;
        let columns = this.columns;

        let bodyWidth = this.$el.clientWidth;
        let bodyMinWidth = 0;

        let flattenColumns = [];

        columns.forEach((column) => {
          if (column.isColumnGroup) {
            flattenColumns.push.apply(flattenColumns, column.columns);
          } else {
            flattenColumns.push(column);
          }
        });

        if (fit) {
          let flexColumns = [];
          let definedWidthColumnsWidth = 0;
          let definedMinWidthSum = 0;

          flattenColumns.forEach((column) => {
            definedMinWidthSum += column.minWidth || 80;
            bodyMinWidth += column.width || column.minWidth || 80;

            if (typeof column.width === 'number') {
              definedWidthColumnsWidth += column.width;
            } else {
              flexColumns.push(column);
            }
          });

          if (bodyMinWidth < bodyWidth - this.gutterWidth) { // do not have scroll bar.
            let flexWidthTotal = bodyWidth - this.gutterWidth - columns.length - bodyMinWidth;
            let flexWidthPerColumn = Math.floor(flexWidthTotal / flexColumns.length);
            let flexWidthFirstColumn = flexWidthTotal - flexWidthPerColumn * flexColumns.length + flexWidthPerColumn;

            flexColumns.forEach(function(column, index) {
              if (index === 0) {
                column.realWidth = (column.minWidth || 80) + flexWidthFirstColumn;
              } else {
                column.realWidth = (column.minWidth || 80) + flexWidthPerColumn;
              }
            });
          } else { // need horizontal scroll bar.
            this.showHoriScrollbar = true;
            flexColumns.forEach(function(column) {
              column.realWidth = column.minWidth;
            });
          }

          this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
        } else {
          flattenColumns.forEach((column) => {
            if (!column.width && !column.minWidth) {
              column.realWidth = 80;
            }

            bodyMinWidth += column.realWidth;
          });
          this.showHoriScrollbar = bodyMinWidth > bodyWidth;

          this.bodyWidth = bodyMinWidth;
        }

        if (this.styleNode) {
          let styleSheet = this.styleNode.sheet;

          for (var i = 0, j = styleSheet.cssRules.length; i < j; i++) {
            styleSheet.deleteRule(0);
          }

          columns.forEach(function(column) {
            if (column.isColumnGroup) {
              let childColumns = column.columns;
              let groupWidth = 0;
              childColumns.forEach(function(childColumn) {
                groupWidth += childColumn.realWidth;
                styleSheet.insertRule(`.${childColumn.id}, .${childColumn.id} > div { width: ${childColumn.realWidth}px; }`, styleSheet.cssRules.length);
              });

              styleSheet.insertRule(`.${column.id}, .${column.id} > div { width: ${groupWidth}px; }`, styleSheet.cssRules.length);
            } else {
              styleSheet.insertRule(`.${column.id}, .${column.id} > div { width: ${column.realWidth}px; }`, styleSheet.cssRules.length);
            }
          });
        }

        if (this.fixedColumnCount > 0) {
          let fixedBodyWidth = 0;
          let fixedColumnCount = this.fixedColumnCount;

          columns.forEach(function(column, index) {
            if (index < fixedColumnCount) {
              fixedBodyWidth += column.realWidth;
            }
          });

          this.fixedBodyWidth = fixedBodyWidth;
        }

        this.headerHeight = this.$el.querySelector('.grid-header-wrapper').offsetHeight;

        if (this.$header) {
          this.$header.updateColGroup();
        }

        if (this.$fixedHeader) {
          this.$fixedHeader.updateColGroup();
          this.$fixedHeader.$el.querySelector('tr').style.height = this.$header.$el.offsetHeight + 'px';
        }
      },

      $calcHeight(height) {
        if (typeof height === 'string') {
          if (/^\d+$/.test(height)) {
            height = Number(height);
          }
        }

        if (!isNaN(height) && this.$el) {
          var headerHeight = this.headerHeight = this.$el.querySelector('.grid-header-wrapper').offsetHeight;
          var bodyHeight = (height - headerHeight);
          var gridWrapper = this.$el.querySelector('.grid-body-wrapper');
          gridWrapper.style.height = bodyHeight + 'px';

          this.$el.style.height = height + 'px';

          var fixedBodyWrapper = this.$el.querySelector('.grid-fixed-body-wrapper');
          if (fixedBodyWrapper) {
            fixedBodyWrapper.style.height = (this.showHoriScrollbar ? gridWrapper.offsetHeight - this.gutterWidth : gridWrapper.offsetHeight) + 'px';
          }
        }
      },

      handleHeaderClick(column, event) {
        var target = event.target;
        while (target && target.tagName !== 'TH') {
          target = target.parentNode;
        }

        if (target && target.tagName === 'TH') {
          if (hasClass(target, 'noclick')) {
            removeClass(target, 'noclick');
            return;
          }
        }

        if (!column.sortable) return;

        if (this.sortingColumn !== column) {
          if (this.sortingColumn) {
            this.sortingColumn.direction = '';
          }
          this.sortingColumn = column;
          this.sortingProperty = column.property;
        }

        if (!column.direction) {
          column.direction = 'ascending';
        } else if (column.direction === 'ascending') {
          column.direction = 'descending';
        } else {
          column.direction = '';
          this.sortingColumn = null;
          this.sortingProperty = null;
        }
        this.sortingDirection = column.direction === 'descending' ? -1 : 1;
      },

      reRender() {
        if (this.$body) {
          this.$body.$destroy();
          this.$body = null;
        }

        if (this.$header) {
          this.$header.$destroy();
          this.$header = null;
        }

        if (this.$fixedBody) {
          this.$fixedBody.$destroy();
          this.$fixedBody = null;
        }

        if (this.$fixedHeader) {
          this.$fixedHeader.$destroy();
          this.$fixedHeader = null;
        }

        this.doRender();
      },

      updateScrollInfo() {
        Vue.nextTick(() => {
          if (this.$el) {
            let gridBodyWrapper = this.$el.querySelector('.grid-body-wrapper');
            let gridBody = this.$el.querySelector('.grid-body-wrapper .grid-body');

            this.showVertScrollbar = gridBody.offsetHeight > gridBodyWrapper.offsetHeight;
          }
        });
      },

      doRender() {
        let bodyWrapper = this.$el.querySelector('.grid-body-wrapper');
        let headerWrapper = this.$el.querySelector('.grid-header-wrapper');
        const el = this.$el;
        if (!this.$ready) {
          bodyWrapper.addEventListener('scroll', function() {
            headerWrapper.scrollLeft = this.scrollLeft;
            let fixedBodyWrapper = el.querySelector('.grid-fixed-body-wrapper');
            if (fixedBodyWrapper) {
              fixedBodyWrapper.scrollTop = this.scrollTop;
            }
          });
        }

        this.$calcColumns();

        if (!this.$ready && this.fit) {
          this.windowResizeListener = throttle(() => {
            this.$calcColumns();
          }, 200);
          window.addEventListener('resize', this.windowResizeListener);
        }

        this.$renderHeader();
        this.$renderBody();
        this.$renderHeader(true);
        this.$renderBody(true);

        Vue.nextTick(() => {
          if (this.height) {
            this.$calcHeight(this.height);
          }
        });
      },

      $renderHeader(fixed) {
        let columns = fixed ? this.fixedColumns : this.columns;
        if (fixed && columns.length === 0) return;

        let headerTable = this.$el.querySelector(fixed ? '.grid-fixed-header-wrapper .grid-header' : '.grid-header-wrapper .grid-header');

        if (fixed) {
          this.$fixedHeader = new Vue(merge({
            parent: this,
            el: headerTable,
            replace: false,
            columns: columns,
            fixed: fixed
          }, GridHeader));
        } else {
          this.$header = new Vue(merge({
            parent: this,
            el: headerTable,
            replace: false,
            columns: columns,
            fixed: fixed
          }, GridHeader));
        }
      },

      $renderBody(fixed) {
        var columns = fixed ? this.fixedColumns : this.columns;

        if (fixed && columns.length === 0) return;

        var bodyTable = this.$el.querySelector(fixed ? '.grid-fixed-body-wrapper tbody' : '.grid-body tbody');

        var body = new Vue(merge({
          parent: this,
          inherit: true,
          el: bodyTable,
          replace: false,
          columns: columns,
          fixed: fixed
        }, GridBody));

        if (fixed) {
          this.$fixedBody = body;
        } else {
          this.$body = body;
        }
      }
    },

    created() {
      this.gridId = 'grid_' + gridIdSeed + '_';

      if (GUTTER_WIDTH === undefined) {
        GUTTER_WIDTH = getScrollbarWidth();
      }
      this.gutterWidth = GUTTER_WIDTH;

      this.debouncedReRender = debounce(() => {
        Vue.nextTick(() => {
          this.reRender();
        });
      }, 200);
    },

    computed: {
      selection() {
        if (this.selectionMode === 'multiple') {
          var data = this.data || [];
          return data.filter(function(item) {
            return item.$selected === true;
          });
        } else if (this.selectionMode === 'single') {
          return this.selected;
        } else {
          return null;
        }
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
      fixedColumnCount() {
        this.debouncedReRender();
      },

      height(value) {
        this.$calcHeight(value);
      },

      data(newVal) {
        this.handleDataChange(newVal);
        this.updateScrollInfo();
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
      if (this.windowResizeListener) {
        window.removeEventListener('resize', this.windowResizeListener);
      }
    },

    ready() {
      this.doRender();

      this.$ready = true;
      if (this.data) {
        this.handleDataChange(this.data);
      }
      this.updateScrollInfo();
    },

    data() {
      return {
        showHoriScrollbar: false,
        showVertScrollbar: false,
        hoverRowIndex: null,
        headerHeight: 35,
        selected: null,
        columns: [],
        resizeProxyVisible: false,
        bodyWidth: '',
        fixedBodyWidth: '',
        sortingColumn: null,
        sortingProperty: null,
        sortingDirection: 1
      };
    }
  };
</script>