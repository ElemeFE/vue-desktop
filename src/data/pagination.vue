<template>
  <div class="d-pagination">
  </div>
</template>

<style>
  .d-pagination {
    padding: 2px 5px;
    background: #fff;
  }

  .d-pagination span,
  .d-pagination button {
    display: inline-block;
    font-size: 14px;
    min-width: 26px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    box-sizing: border-box;
  }

  .d-pagination button {
    border: none;
    padding: 0 6px;
    background: transparent;
  }

  .d-pagination button:focus {
    outline: none;
  }

  .d-pagination button.disabled {
    color: #bbb;
    cursor: default;
  }

  .d-pagination span.d-icon,
  .d-pagination button.d-icon {
    text-align: center;
    cursor: pointer;
  }

  .d-pagination .pager {
    border-radius: 3px;
    user-select: none;
    list-style: none;
    display: inline-block;
    vertical-align: top;
    font-size: 0;
    padding: 0;
  }

  .d-pagination .pager li {
    border: 1px solid #dddddd;
    background: #fff;
    vertical-align: top;
    margin-left: -1px;
    display: inline-block;
    font-size: 14px;
    min-width: 26px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
  }

  .d-pagination .pager li.number:hover {
    margin-left: -1px;
  }

  .d-pagination .pager li.active {
    background-color: #f4f4f4;
    cursor: default;
  }

  .d-pagination .pager li.ellipsis {
    cursor: default;
  }

  .d-pagination select {
    min-height: 28px;
    height: 28px;
    width: 50px;
    background: transparent;
    border: 1px solid#ddd;
  }

  .d-pagination-info {
  }

  .d-pagination-rightwrapper {
    float: right;
  }

  .d-pagination-editor {
    border: 1px solid #e5e6e7;
    border-radius: 2px;
    line-height: 18px;
    padding: 4px 2px;
    width: 30px;
    text-align: center;
    margin: 0 3px;
    box-sizing: border-box;
    transition: border 0.3s;
  }

  .d-pagination-editor:focus {
    outline: none;
    border-color: #1ab394;
  }
</style>

<script type="text/ecmascript-6">
  var Vue = require('vue');

  var TEMPLATE_MAP = {
    first: '<span is="first"></span>',
    prev: '<span is="prev"></span>',
    manual: '<span is="manual"></span>',
    pager: '<span is="pager" :current-page.sync="currentPage" :page-count.sync="pageCount"></span>',
    next: '<span is="next"></span>',
    last: '<span is="last"></span>',
    list: '<span is="list"></span>',
    slot: '<slot></slot>',
    info: '<span is="info"></span>'
  };

  export default {
    props: {
      pageSize: {
        type: Number,
        default: 10
      },

      itemCount: {
        type: Number,
        default: 0
      },

      currentPage: {
        type: Number,
        default: 1
      },

      layout: {
        default: 'first, prev, manual, next, last, slot, ->, info'
      },

      pageSizeList: {
        type: Array,
        default() {
          return [ 10, 20, 30, 40, 50, 100 ]
        }
      }
    },

    components: {
      Prev: {
        template: '<button class="d-icon d-icon-arrow-left" :class="{ disabled: $parent.currentPage <= 1 }" @click="$parent.prev()"></button>'
      },

      Next: {
        template: '<button class="d-icon d-icon-arrow-right" @click="$parent.next()" :class="{ disabled: $parent.currentPage === $parent.pageCount }"></button>'
      },

      First: {
        template: '<button class="d-icon d-icon-first" :class="{ disabled: $parent.currentPage <= 1 }" @click="$parent.first()"></button>'
      },

      Last: {
        template: '<button class="d-icon d-icon-last"  :class="{ disabled: $parent.currentPage === $parent.pageCount }" @click="$parent.last()"></button>'
      },

      List: {
        template: '<select v-model="$parent.pageSize"><option v-for="item in $parent.pageSizeList" value="{{item}}">{{item}}</option></select>'
      },

      Manual: {
        data() {
          return {
            oldValue: null
          };
        },

        methods: {
          handleFocus(event) {
            this.oldValue = event.target.value;
          },

          handleChange(event) {
            var target = event.target;
            if (target.value !== this.oldValue && Number(target.value) === this.$parent.currentPage) {
              this.$parent.$emit('current-change', this.$parent.currentPage);
            }

            this.oldValue = null;
          }
        },
        template: '<span>第<input class="d-pagination-editor" v-model="$parent.currentPage" @change="handleChange($event)" @focus="handleFocus($event)" style="width: 30px;" lazy />页, 共 {{$parent.pageCount}} 页</span>'
      },

      Info: {
        template: '<span class="d-pagination-info">显示第 {{$parent.startRecordIndex}} - {{ $parent.endRecordIndex }} 条数据, 共 {{$parent.itemCount}} 条记录 </span>'
      },

      Pager: {
        template: `<ul @click="onPagerClick($event)" class="pager">
          <li :class="{ active: currentPage === 1 }" v-show="pageCount > 0" class="number">1</li>
          <li class="ellipsis" v-show="showPrevMore">...</li>
          <li v-for="pager in pagers" :class="{ active: $parent.currentPage === pager }" class="number">{{ pager }}</li>
          <li class="ellipsis" v-show="showNextMore">...</li>
          <li :class="{ active: currentPage === pageCount }" class="number" v-show="pageCount > 1">{{ pageCount }}</li>
        </ul>`,

        props: {
          currentPage: {
            type: Number
          },
          pageCount: {
            type: Number
          }
        },

        methods: {
          onPagerClick(event) {
            var target = event.target;
            if (target.tagName === 'UL') {
              return;
            }

            var newPage = Number(event.target.textContent);
            var pageCount = this.pageCount;
            var currentPage = this.currentPage;

            if (target.className === 'ellipsis') {
              return;
            }

            if (!isNaN(newPage)) {
              if (newPage < 1) {
                newPage = 1;
              }

              if (newPage > pageCount) {
                newPage = pageCount;
              }
            }

            this.currentPage = newPage;

            if (newPage !== currentPage) {
              this.$parent.$emit('current-change', newPage);
            }
          }
        },

        computed: {
          pagers() {
            var pagerCount = 5;

            var currentPage = Number(this.currentPage);
            var pageCount = Number(this.pageCount);

            var showPrevMore = false;
            var showNextMore = false;

            if (pageCount > pagerCount) {
              if (currentPage > pagerCount - 2) {
                showPrevMore = true;
              }

              if (currentPage < pageCount - 2) {
                showNextMore = true;
              }
            }

            var array = [];
            var i;

            if (showPrevMore && !showNextMore) {
              for (i = pageCount - 3; i < pageCount; i++) {
                array.push(i);
              }
            } else if (!showPrevMore && showNextMore) {
              for (i = 2; i < pagerCount; i++) {
                array.push(i);
              }
            } else if (showPrevMore && showNextMore) {
              for (i = currentPage - 1; i <= currentPage + 1; i++) {
                array.push(i);
              }
            } else {
              for (i = 2; i < pageCount; i++) {
                array.push(i);
              }
            }

            this.showPrevMore = showPrevMore;
            this.showNextMore = showNextMore;

            return array;
          }
        },

        data() {
          return {
            current: null,
            showPrevMore: false,
            showNextMore: false
          };
        }
      }
    },

    methods: {
      prev() {
        var oldPage = this.currentPage;
        var newVal = this.currentPage - 1;
        this.currentPage = this.getValidCurrentPage(newVal);

        if (this.currentPage !== oldPage) {
          this.$emit('current-change', this.currentPage);
        }
      },

      next() {
        var oldPage = this.currentPage;
        var newVal = this.currentPage + 1;
        this.currentPage = this.getValidCurrentPage(newVal);

        if (this.currentPage !== oldPage) {
          this.$emit('current-change', this.currentPage);
        }
      },

      first() {
        var oldPage = this.currentPage;
        var newVal = 1;
        this.currentPage = this.getValidCurrentPage(newVal);

        if (this.currentPage !== oldPage) {
          this.$emit('current-change', this.currentPage);
        }
      },

      last() {
        var oldPage = this.currentPage;
        var newVal = this.pageCount;
        this.currentPage = this.getValidCurrentPage(newVal);

        if (this.currentPage !== oldPage) {
          this.$emit('current-change', this.currentPage);
        }
      },

      getValidCurrentPage(value) {
        value = parseInt(value, 10);

        var resetValue;
        if (value < 1) {
          resetValue = this.pageCount > 0 ? 1 : 0;
        } else if (value > this.pageCount) {
          resetValue = this.pageCount;
        }

        if (resetValue === undefined && isNaN(value)) {
          value = this.pageCount > 0 ? 1 : 0;
        }

        return resetValue === undefined ? value : resetValue;
      }
    },

    created() {
      var template = '<div class="d-pagination">';
      var layout = this.$options.layout || this.layout || '';

      var components = layout.split(',').map((item) => item.trim());

      var haveRightWrapper = false;

      components.forEach((component) => {
        if (component === '->') {
          haveRightWrapper = true;
          template += '<div class="d-pagination-rightwrapper">';
        } else {
          template += TEMPLATE_MAP[component];
        }
      });

      if (haveRightWrapper) {
        template += '</div>';
      }
      template += '</div>';

      this.$options.template = template;
    },

    computed: {
      pageCount() {
        return Math.ceil(this.itemCount / this.pageSize);
      },
      startRecordIndex() {
        var result = (this.currentPage - 1) * this.pageSize + 1;
        return result > 0 ? result : 0;
      },
      endRecordIndex() {
        var result = this.currentPage * this.pageSize;
        return result > this.itemCount ? this.itemCount : result;
      }
    },

    watch: {
      pageCount(newVal) {
        if (newVal > 0 && this.currentPage === 0) {
          this.currentPage = 1;
        } else if (this.currentPage > newVal) {
          this.currentPage = newVal;
        }
      },

      currentPage(newVal, oldVal) {
        newVal = parseInt(newVal, 10);

        if (isNaN(newVal)) {
          newVal = oldVal || 1;
        } else {
          newVal = this.getValidCurrentPage(newVal);
        }

        if (newVal !== undefined) {
          Vue.nextTick(() => {
            this.currentPage = newVal;
          });
        }
      }
    },

    ready() {
      this.currentPage = this.getValidCurrentPage(this.currentPage);
    }
  }
</script>