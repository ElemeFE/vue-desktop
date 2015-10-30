<template>
  <button class="btn btn-success btn-lg" @click="bigModal = !bigModal">Big modal</button>

  <dialog title="Big Modal" :show.sync="bigModal" width="400">
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div slot="dialog-footer">
      <button @click="bigModal = !bigModal">OK</button>
      <button @click="bigModal = !bigModal">Cancel</button>
    </div>
  </dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        bigModal: false
      }
    },
    methods: {

    },
    components: {

    }
  };
</script>