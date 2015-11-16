<template>
  <d-form :model='team' schema='Team' label-width="140" :cols="3">
    <d-text-field label-width="180" label="团队名称" property='teamName'></d-text-field>
    <d-text-field class="d-cell-1-2" label="昵称" property='nickname'></d-text-field>
    <d-text-field label="密码" type='password' property='password'></d-text-field>
  </d-form>

  <d-field label="Custom" required :label-width="0">
    我是Custom的内容<br/>
    我是Custom的内容<br/>
    我是Custom的内容
  </d-field>

  <d-select-field label="Select Field" schema="Team" :model="team" property="hasMapping" multi-select></d-select-field>

  <d-select-field label="Remote Mapping" schema="Team" :model="team" property="remoteMapping"></d-select-field>

  <d-select-field v-ref:select-field label="Remote Mapping 2" schema="Team" :model="team" property="remoteMapping2" parent-property="remoteMapping"></d-select-field>

  {{ team.remoteMapping }} {{ team.remoteMapping2 }}

  <d-checkbox-field label="CheckBox" :model="team" property="sex" schema="Team"></d-checkbox-field>

  <d-text-field :model="team" property="birthday" schema="Team"></d-text-field>

  <d-text-field :model="team" property="count" schema="Team"></d-text-field>

  <d-text-field type="textarea" :editor-height="100"></d-text-field>

  <d-radiogroup-field label="RadioGroup" :model="team" property="category">
    <d-radio value="1">dfadf</d-radio>
    <d-radio value="2">dfadf</d-radio>
    <d-radio value="3">dfadf</d-radio>
    <d-radio value="4">dfadf</d-radio>
  </d-radiogroup-field>

  <d-radiogroup-field label="RadioGroup Use mapping" schema="Team" :model="team" property="hasMapping"></d-radiogroup-field>

  <d-button @click="validate">Validate</d-button>

  <div>Checkbox: {{ team.sex }}</div>
  <div>Count: {{ team.count }}</div>
  <div>teamName: {{ team.teamName }}</div>
  <div>hasMapping: {{ team.hasMapping }}</div>
  <div>Category: {{ team.category }}</div>

</template>

<script type="text/ecmascript-6" lang="babel">
  import { Schema } from '../../src/index.js'

  var TeamSchema = new Schema('Team', {
    teamName: {
      required: true
    },

    nickname: {
      required: true
    },

    password: {},

    birthday: {
      label: '生日',
      type: 'date',
      default() {
        return new Date()
      }
    },

    sex: {
      default: 'male',
      trueValue: 'male',
      falseValue: 'female'
    },

    category: {},

    count: {
      label: '数量',
      type: 'integer',
      min: 1,
      max: 10
    },

    hasMapping: {
      mapping: {
        '测试0': 0,
        '测试1': 1,
        '测试2': 2,
        '测试3': 3,
        '测试4': 4,
        '测试5': 5
      }
    },

    remoteMapping: {
      default: 2,
      mapping: function() {
        return new Promise(function(resolve) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/examples/json/mapping.json', true);
          xhr.onload = function(response) {
            resolve(JSON.parse(response.target.responseText));
          };
          xhr.send();
        });
      }
    },

    remoteMapping2: {
      default: 21,
      mapping: function(model) {
        return new Promise(function(resolve) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/examples/json/mapping2.json', true);
          xhr.onload = function(response) {
            var remoteMapping = model.remoteMapping;
            if (!remoteMapping) {
              remoteMapping = 1;
            }
            resolve(JSON.parse(response.target.responseText)[remoteMapping]);
          };
          xhr.send();
        });
      }
    }
  });

  export default {
    methods: {
      validate() {
        TeamSchema.validate(this.team);
      }
    },

    data () {
      return {
        team: TeamSchema.create()
      }
    }
  }
</script>