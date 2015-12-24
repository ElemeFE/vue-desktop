<template>
  <li class="breadcrumb-item">
    <a v-link="{ path: link }" class="breadcrumb-anchor" :class="{ 'breadcrumb-link': isLink }"><slot></slot></a>
    <span class="breadcrumb-slash">/</span>
  </li>
</template>

<style>
  .breadcrumb-item {
    display: inline;
  }

  .breadcrumb-item .breadcrumb-anchor {
    text-decoration: none;
    color: #666;
  }

  .breadcrumb-item .breadcrumb-anchor.v-link-active {
    font-weight: 700;
    color: #666;
    cursor: default;
  }

  .breadcrumb-item .breadcrumb-anchor.v-link-active:hover {
    color: #666;
  }

  .breadcrumb-item .breadcrumb-link {
    color: #0089dc;
    transition: color .3s;
  }

  .breadcrumb-item .breadcrumb-link:hover {
    color: #006fb7;
  }

  .breadcrumb-item .breadcrumb-slash {
    margin: 0 5px;
  }

  .breadcrumb-item:last-child .breadcrumb-slash {
    display: none;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      link: {
        type: String,
        default: null
      }
    },

    data() {
      return {
        isLink: false
      }
    },

    ready() {
      if (this.link) {
        this.isLink = true;
      }
    }
  }
</script>