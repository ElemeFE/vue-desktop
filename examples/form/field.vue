<template>
  <form-field label="团队名称" :model='team' property='teamName' :schema='schema' hint-message="xxx"></form-field>
  <form-field label="昵称" :model='team' property='nickname' :schema='schema' hint-message="xxx"></form-field>
</template>

<script type="text/ecmascript-6">
  var schemas = {
    teamName: {
      type: 'required',
      errorMessage: '请填写团队名称'
    },
    nickname: {
      type: 'required',
      errorMessage: '请填写昵称'
    }
  };

  export default {
    data () {
      return {
        schema: schemas,
        team: {
          teamName: '',
          nickname: ''
        }
      }
    }
  }
</script>