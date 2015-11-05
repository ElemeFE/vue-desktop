<template>
  <d-alert title="成功" type="success">
    成功提示的示例
  </d-alert>

  <d-alert title="警告" type="warning">
    警告提示的示例
  </d-alert>

  <d-alert title="消息" type="info" closable>
    消息提示的示例
  </d-alert>

  <d-alert title="错误" type="error" closable close-text="知道了" @close=closeFunc>
    错误提示的示例
  </d-alert>
</template>

<script type="text/ecmascript-6" lang="babel">
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