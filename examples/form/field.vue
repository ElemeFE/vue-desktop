<template>
  <d-text-field label="团队名称" :model='team' property='teamName' schema='Team'></d-text-field>
  <d-text-field label="昵称" :model='team' property='nickname' schema='Team'></d-text-field>
  <d-text-field label="密码" :model='team' type='password' property='password' schema='Team'></d-text-field>

  <d-field label="Custom">
    我是Custom的内容<br/>
    我是Custom的内容<br/>
    我是Custom的内容
  </d-field>

  <d-checkbox-field label="CheckBox" :model="team" property="sex"></d-checkbox-field>

  <d-text-field :model="team" property="birthday" schema="Team" type="date"></d-text-field>

  {{ team.birthday }}

  <d-radiogroup-field label="RadioGroup" :model="team" property="category">
    <d-radio value="1">dfadf</d-radio>
    <d-radio value="2">dfadf</d-radio>
    <d-radio value="3">dfadf</d-radio>
    <d-radio value="4">dfadf</d-radio>
  </d-radiogroup-field>

  <d-radiogroup-field label="RadioGroup Use mapping" schema="Team" :model="team" property="hasMapping"></d-radiogroup-field>

  <d-select-field label="Select Field" schema="Team" :model="team" property="hasMapping"></d-select-field>

  <div>teamName: {{ team.teamName }}</div>
  <div>hasMapping: {{ team.hasMapping }}</div>
  <div>Category: {{ team.category }}</div>

</template>

<script type="text/ecmascript-6" lang="babel">
  import { SchemaStore } from '../../src/index.js'

  SchemaStore.defineSchema('Team', {
    teamName: {
      required: true
    },
    nickname: {
      required: true
    },
    password: {
    },
    birthday: {
      label: '生日',
      type: Date,
      default() {
        return new Date()
      }
    },
    sex: {},
    category: {},
    hasMapping: {
      mapping: {
        '测试1': 1,
        '测试2': 2,
        '测试3': 3,
        '测试4': 4,
        '测试5': 5
      }
    }
  });

  export default {
    data () {
      return {
        team: SchemaStore.getSchema('Team').$new()
      }
    }
  }
</script>