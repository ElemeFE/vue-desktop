<template>
  <div>
    <!--<d-date-picker selection-mode="day" @pick="onPick"></d-date-picker>-->
    <!--<d-time-picker :hours="18" :minutes="24"></d-time-picker>-->
  </div>

  <d-panel title="Editors">
    <d-form :model='model' :schema='schema' label-width="140" :cols="1" style="width: 450px;">
      <d-text-field property='nickname'></d-text-field>
      <d-text-field type="password" property="password"></d-text-field>
      <d-select-field property="simpleMapping"></d-select-field>
      <d-text-field property="birthday"></d-text-field>
      <d-text-field property="count"></d-text-field>
      <d-text-field type="textarea" :editor-height="100" property="comment"></d-text-field>

      <d-checkbox-field property="sex"></d-checkbox-field>
      <d-select-field property="simpleMapping"></d-select-field>
      <d-radiogroup-field property="simpleMapping"></d-radiogroup-field>
    </d-form>
  </d-panel>
</template>

<script type="text/ecmascript-6">
  import { default as schema } from './schema';

  export default {
    methods: {
      onPick(value) {
        console.log(value);
      }
    },

    data () {
      return {
        model: schema.newModel(),
        schema: schema
      }
    }
  }
</script>