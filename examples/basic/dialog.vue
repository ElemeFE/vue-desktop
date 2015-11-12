<template>
  <button class="btn btn-success btn-lg" @click="showDialog = !showDialog">Big modal</button>

  <d-dialog title="Big Modal" :visible.sync="showDialog" width="400">
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div slot="dialog-footer">
      <d-button @click="showDialog = !showDialog">OK</d-button>
      <d-button @click="showDialog = !showDialog">Cancel</d-button>
    </div>
  </d-dialog>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        showDialog: false
      }
    }
  };
</script>