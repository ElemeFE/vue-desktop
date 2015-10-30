<template>
  <div>
    <text-editor size="lg" placeholder="lg"></text-editor>
    <text-editor placeholder="normal"></text-editor>
    <text-editor size="sm" placeholder="sm"></text-editor>
  </div>

  <div>
    <text-editor placeholder="ReadOnly" :readonly="true"></text-editor>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
  };
</script>