<template>
  <form-field label="团队名称" :model='team' property='teamName' schema='Team' hint-message="xxx"></form-field>
  <form-field label="昵称" :model='team' property='nickname' schema='Team' hint-message="xxx"></form-field>
</template>

<script type="text/ecmascript-6">
  import { SchemaStore } from '../../src/index.js'

  SchemaStore.defineSchema('Team', {
    teamName: {
      required: true,
      message: '请填写团队名称'
    },
    nickname: {
      required: true,
      message: '请填写昵称'
    }
  });

  export default {
    data () {
      return {
        team: {
          teamName: '',
          nickname: ''
        }
      }
    }
  }
</script>