<template>
  <d-panel title="Simple Mapping" style="margin: 5px 0;">
    <d-form :model='model' :schema='schema' label-width="140" :cols="1" style="width: 450px;">
      <d-select-field :model="team" property="simpleMapping"></d-select-field>
      <d-radiogroup-field property="simpleMapping"></d-radiogroup-field>
      <d-checkgroup-field property="simpleMapping2" :cols="2"></d-checkgroup-field>
    </d-form>
  </d-panel>

  <d-panel title="Remote Mapping" style="margin: 5px 0;">
    <d-form :model='model' :schema='schema' label-width="140" :cols="1" style="width: 450px;">
      <d-select-field property="remoteMapping"></d-select-field>
      <d-radiogroup-field property="remoteMapping"></d-radiogroup-field>
    </d-form>
  </d-panel>

  <d-panel title="Cascade Mapping" style="margin: 5px 0;">
    <d-form :model='model' :schema='schema' label-width="140" :cols="1" style="width: 450px;">
      <d-select-field property="cascadeMapping1"></d-select-field>
      <d-select-field property="cascadeMapping2" parent-property="cascadeMapping1"></d-select-field>
    </d-form>
  </d-panel>
</template>

<script type="text/ecmascript-6">
  import { Schema } from '../../src/index.js';

  var schema = new Schema({
    simpleMapping: {
      label: 'Simple Mapping',
      mapping: {
        'Simple-0': 0,
        'Simple-1': 1,
        'Simple-2': 2,
        'Simple-3': 3,
        'Simple-4': 4,
        'Simple-5': 5
      }
    },

    simpleMapping2: {
      label: 'Simple Mapping',
      default: [2, 3],
      mapping: {
        'Simple-1': 1,
        'Simple-2': 2,
        'Simple-3': 3,
        'Simple-4': 4,
        'Simple-5': 5
      }
    },

    remoteMapping: {
      label: 'Remote Mapping',
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

    cascadeMapping1: {
      label: 'Parent Mapping',
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

    cascadeMapping2: {
      label: 'Cascade Mapping',
      mapping: function(model) {
        return new Promise(function(resolve) {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', '/examples/json/mapping2.json', true);
          xhr.onload = function(response) {
            var remoteMapping = model.cascadeMapping1;
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
    },

    data() {
      return {
        model: schema.newModel(),
        schema: schema
      };
    }
  };
</script>