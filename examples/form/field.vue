<template>
  <d-text-field label="团队名称" :model='team' property='teamName' schema='Team' hint-message="xxx"></d-text-field>
  <d-text-field label="昵称" :model='team' property='nickname' schema='Team' hint-message="xxx"></d-text-field>

  <div>
    <d-field label="Custom">
      我是Custom的内容<br/>
      我是Custom的内容<br/>
      我是Custom的内容
    </d-field>
  </div>

  <div>
    <d-checkbox-field label="CheckBox" :model="team" property="sex"></d-checkbox-field>
  </div>

  <div>
    <d-radiogroup-field label="RadioGroup" :model="team" property="category">
      <d-radio value="1">dfadf</d-radio>
      <d-radio value="2">dfadf</d-radio>
      <d-radio value="3">dfadf</d-radio>
      <d-radio value="4">dfadf</d-radio>
    </d-radiogroup-field>
  </div>

  <div>Category: {{team.category}}</div>
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
    },
    sex: {},
    category: {}
  });

  export default {
    data () {
      return {
        team: {
          teamName: '',
          nickname: '',
          sex: null,
          category: null
        }
      }
    }
  }
</script>