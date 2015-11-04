<template>
  <alert title="成功" type="success">
    成功提示的示例
  </alert>

  <alert title="警告" type="warning">
    警告提示的示例
  </alert>

  <alert title="消息" type="info" closable>
    消息提示的示例
  </alert>

  <alert title="错误" type="error" closable close-text="知道了" @close=closeFunc>
    错误提示的示例
  </alert>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        closeFunc: function() {
          console.log('Closed!');
        }
      }
    }
  };
</script>