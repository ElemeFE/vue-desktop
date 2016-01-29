<template>
  <div>
    <d-grid :fit="false" :data="data" height="400">
      <div slot="bottom">
        <div class="loading" v-show="loading">
          <div class="loading-content"><div></div></div>
        </div>
      </div>
      <d-grid-column v-for="column in columns" :property="column.property" :label="column.property" :width="300"></d-grid-column>
    </d-grid>

    <d-pagination layout="info,->,first,prev,manual,next,last,slot" :item-count="itemCount" :current-page.sync="currentPage">
      <button>Save</button>
    </d-pagination>
  </div>
</template>

<style scoped>
  .loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9989;
    text-align: center;
    background: rgba(0, 0, 0, 0.3);
  }

  .loading-content {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -30px;
    margin-top: -30px;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border-width: 6px;
    border-style: solid;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    animation: loading-progress-rotation 1s infinite linear
  }

  @keyframes loading-progress-rotation {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {},
      columns: {
        default() {
          return [];
        }
      },
      itemCount: {
        default: 0
      },
      currentPage: {
        default: 1
      },
      loading: {
        default: false
      }
    },

    ready() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 800);
    },

    watch: {
      currentPage(newVal) {
      }
    }
  };
</script>