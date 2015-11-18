<template>
  <d-alert>
    Setting fields common properties in form component.
  </d-alert>

  <d-panel title="Multi Columns Form" style="margin: 5px 0;">
    <d-form :model='model' :schema='schema' label-width="140" :cols="2">
      <d-text-field property='nickname'></d-text-field>
      <d-text-field type="password" property="password"></d-text-field>
      <d-text-field property="birthday"></d-text-field>
      <d-text-field property="count"></d-text-field>
      <d-text-field type="textarea" :editor-height="100" property="comment"></d-text-field>
    </d-form>
  </d-panel>

  <d-panel title="Custom field" style="margin: 5px 0;">
    <d-form :model='model' :schema='schema' label-width="140" :cols="2">
      <d-text-field property='nickname' :required="false" placeholder="required fields without *"></d-text-field>
      <d-field></d-field>
      <d-text-field :label-width="180" type="password" property="password" placeholder="special label width"></d-text-field>
      <d-text-field property="count" hide-label placeholder="field without label"></d-text-field>
      <d-text-field class="d-cell-1-1" type="textarea" :editor-height="100" property="comment" placeholder="field span two columns"></d-text-field>
      <d-field label="Custom Field">
        <p>
          This is a custom field.
        </p>
        <p>
          You can place anything in this field.
        </p>
      </d-field>
    </d-form>
  </d-panel>

</template>

<script type="text/ecmascript-6" lang="babel">
  var schema = require('./schema');

  export default {
    methods: {
    },

    data () {
      return {
        model: schema.create(),
        schema: schema
      }
    }
  }
</script>