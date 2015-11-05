<template>
  <div class="pagination">
    <ul @click="onPagerClick($event)">
      <li class="prevBtn" v-show="showButton">&lt;</li>
      <li :class="{ active: currentPage === 1 }" v-show="pageCount > 0">1</li>
      <li class="ellipsis" v-show="showPrevMore">...</li>
      <li v-for="pager in pagers" :class="{ active: currentPage === pager }">{{ pager }}</li>
      <li class="ellipsis" v-show="showNextMore">...</li>
      <li :class="{ active: currentPage === pageCount }">{{ pageCount }}</li>
      <li class="nextBtn" v-show="showButton">&gt;</li>
    </ul>
  </div>
</template>

<style>
  .pagination ul {
    list-style: none;
    font-size: 14px;
  }

  .pagination ul li {
    display: inline-block;
    border: solid 1px #eee;
    width: 22px;
    text-align: center;
    padding: 4px 0;
    cursor: pointer;
    margin-right: 6px;
  }

  .pagination ul li.active {
    border: solid 1px #0089dc;
    background-color: #0089dc;
    color: #fff;
    cursor: default;
  }

  .pagination ul li.ellipsis {
    border: none;
    cursor: default;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      pageCount: {},
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
        } else if (target.className === 'prevBtn') {
          newPage = currentPage - 1;
        } else if (target.className === 'nextBtn') {
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
    compiled() {
      this.refresh();
    },
    data() {
      return {
        pagers: [],
        showPrevMore: false,
        showNextMore: false,
        showButton: false,
        pageCount: 0,
        currentPage: -1
      }
    }
  }
</script>