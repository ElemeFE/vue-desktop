<template>
  <d-button type="primary" @click="dialogVisible = !dialogVisible">Show Dialog</d-button>

  <d-dialog title="Dialog" :visible.sync="dialogVisible" width="400">
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </div>
    <div slot="dialog-footer">
      <d-button @click="dialogVisible = false">OK</d-button>
      <d-button @click="dialogVisible = false">Cancel</d-button>
    </div>
  </d-dialog>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        dialogVisible: false
      }
    }
  };
</script>