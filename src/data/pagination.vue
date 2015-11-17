<template>
  <div class="pagination">
    <ul @click="onPagerClick($event)">
      <li class="prevBtn d-icon icon-datepicker-left-arrow" v-show="showButton"></li>
      <li :class="{ active: currentPage === 1 }" v-show="pageCount > 0" class="number">1</li>
      <li class="ellipsis" v-show="showPrevMore">...</li>
      <li v-for="pager in pagers" :class="{ active: currentPage === pager }" class="number">{{ pager }}</li>
      <li class="ellipsis" v-show="showNextMore">...</li>
      <li :class="{ active: currentPage === pageCount }" class="number" v-show="pageCount > 1">{{ pageCount }}</li>
      <li class="nextBtn d-icon icon-datepicker-right-arrow" v-show="showButton"></li>
    </ul>
  </div>
</template>

<style>
  .pagination ul {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    list-style: none;
    display: inline-block;
    background-color: #d0dbe6;
    font-size: 0;
    padding: 0;
    margin: 0;
    border-radius: 5px;
  }

  .pagination li {
    display: inline-block;
    font-size: 14px;
    min-width: 26px;
    line-height: 20px;
    box-sizing: border-box;
    text-align: center;
    padding: 4px;
    cursor: pointer;
    border: 1px solid transparent;
  }

  .pagination li.number:hover {
    background-color: #639af5;
    border-color: #639af5;
    border-radius: 5px;
    color: #fff;
  }

  .pagination li.active {
    border: solid 1px #6f7e95;
    background-color: #6f7e95;
    color: #fff;
    cursor: default;
    border-radius: 5px;
  }

  .pagination li.ellipsis {
    border: none;
    cursor: default;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      pageSize: {
        type: Number,
        default: 10
      },
      itemTotal: {
        type: Number,
        default: 0
      },
      currentPage: {}
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
        } else if (target.className.indexOf('prevBtn') !== -1) {
          newPage = currentPage - 1;
        } else if (target.className.indexOf('nextBtn') !== -1) {
          newPage = currentPage + 1;
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
          this.$emit('change', {currentPage: newPage});
          this.refresh();
        }
      },
      refresh() {
        var pagerCount = 5;

        this.currentPage = Number(this.currentPage);
        this.pageCount = Number(this.pageCount);

        var currentPage = this.currentPage;
        var pageCount = this.pageCount;

        var showPrevMore = false;
        var showNextMore = false;

        var showButton = pageCount > pagerCount;

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
        this.showButton = showButton;
        this.pagers = array;
      }
    },

    computed: {
      pageCount() {
        return Math.ceil(this.itemTotal / this.pageSize);
      }
    },

    compiled() {
      this.refresh();
    },

    watch: {
      pageCount() {
        this.refresh();
      }
    },

    data() {
      return {
        pagers: [],
        showPrevMore: false,
        showNextMore: false,
        showButton: false
      }
    }
  }
</script>