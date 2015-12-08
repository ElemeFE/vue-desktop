<template>
  <div class="d-pagination">
    <span is="first"></span>
    <span is="prev"></span>
    <span is="manual"></span>
    <!--<span is="pager" :current-page.sync="currentPage" :page-count.sync="pageCount"></span>-->
    <span is="next"></span>
    <span is="last"></span>

    <span is="list"></span>

    <slot></slot>

    <span is="info"></span>
  </div>
</template>

<style>
  .d-pagination {
    padding: 2px 5px;
    background: #fff;
  }

  .d-pagination > span {
    display: inline-block;
    font-size: 14px;
    min-width: 26px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
  }

  .d-pagination > span.disabled {
    color: #bbb;
    cursor: default;
  }

  .d-pagination > span.d-icon {
    text-align: center;
    cursor: pointer;
  }

  .d-pagination .pager {
    border-radius: 3px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
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

  .d-pagination .d-selectfield {
    display: inline-table !important;
    min-height: 28px;
    height: 28px;
    width: 60px;
  }

  .d-pagination-info {
    float: right;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var Vue = require('vue');

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
        type: Number
      },

      layout: {
        type: String,
        default: 'first, prev, next, last, manual, list, pager'
      },

      mapping: {
        default() {
          return { 10: 10, 20: 20, 30: 30, 40: 40, 50: 50 };
        }
      }
    },

    components: {
      DSelectField: require('../form/fields/select.vue'),

      DSelectOption: require('../form/select-option.vue'),

      DTextEditor: require('../form/text-editor.vue'),

      Prev: {
        template: '<span class="d-icon icon-arrow-left" :class="{ disabled: $parent.currentPage === 1 }" @click="$parent.prev()"></span>'
      },

      Next: {
        template: '<span class="d-icon icon-arrow-right" @click="$parent.next()" :class="{ disabled: $parent.currentPage === $parent.pageCount }"></span>'
      },

      First: {
        template: '<span class="d-icon icon-first" :class="{ disabled: $parent.currentPage === 1 }" @click="$parent.first()"></span>'
      },

      Last: {
        template: '<span class="d-icon icon-last"  :class="{ disabled: $parent.currentPage === $parent.pageCount }" @click="$parent.last()"></span>'
      },

      List: {
        template: '<span><d-select-field hide-label hide-hint :mapping="$parent.mapping" :model="$parent.model" property="pageSize"></d-select-field></span>'
      },

      manual: {
        template: '<span>第<d-text-editor :value.sync="$parent.currentPage" style="width: 40px;" lazy type="number"></d-text-editor>页</span>'
      },

      Info: {
        template: '<span class="d-pagination-info">第 {{$parent.currentPage}} 页/共 {{$parent.pageCount}} 页, 共 {{$parent.itemCount}} 条数据 </span>'
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
              this.$emit('change', { currentPage: newPage });
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
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },

      next() {
        this.currentPage++;
      },

      first() {
        this.currentPage = 1;
      },

      last() {
        this.currentPage = this.pageCount;
      }
    },

    computed: {
      pageCount() {
        return Math.ceil(this.itemCount / this.pageSize);
      }
    },

    watch: {
      currentPage(newVal, oldVal) {
        newVal = parseInt(newVal, 10);

        var resetVal;
        if (isNaN(newVal)) {
          resetVal = oldVal;
        } else if (newVal < 1) {
          resetVal = 1;
        } else if (newVal > this.pageCount) {
          resetVal = this.pageCount;
        }

        if (resetVal !== undefined) {
          Vue.nextTick(() => {
            this.currentPage = this.pageCount;
          });
        }

        //this.refresh();
      }
    },

    data() {
      return {
        model: this // TODO FIX IT: select model
      }
    }
  }
</script>