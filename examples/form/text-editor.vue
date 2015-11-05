<template>
  <div>
    <d-text-editor size="lg" placeholder="lg" type="password"></d-text-editor>
    <d-text-editor placeholder="normal"></d-text-editor>
    <d-text-editor size="sm" placeholder="sm"></d-text-editor>
  </div>

  <div>
    <d-text-editor placeholder="ReadOnly" :readonly="true"></d-text-editor>
  </div>

  <div>
    <d-text-editor type="textarea" placeholder="please input your message." style="width: 400px; height: 100px;"></d-text-editor>
    <d-text-editor type="textarea" placeholder="please input your message." style="width: 400px; height: 100px;" :readonly="true"></d-text-editor>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
  };
</script>