<template>
  <d-vbox style="height: 100%;">
    <d-form>
      <d-text-field></d-text-field>
    </d-form>

    <d-grid :data="testData" schema="GridTest" height="300" :fit="true" :selection.sync="selection" :fixed-column-count2="3" flex>
      <d-grid-column type="index"></d-grid-column>
      <d-grid-column type="selection"></d-grid-column>
      <d-grid-column property="prop1"></d-grid-column>
      <d-grid-column property="prop2"></d-grid-column>
      <d-grid-column property="prop3" width="400"></d-grid-column>
      <d-grid-column property="prop4"></d-grid-column>
      <d-grid-column label="5" property="prop5"></d-grid-column>
      <d-grid-column label="操作" width="200"><d-button>测试1</d-button><button>测试2</button><button>测试3</button></d-grid-column>
    </d-grid>

    <div>
      xxx
    </div>
  </d-vbox>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { Schema } from '../../src/index.js'

  var testSchema = new Schema('GridTest', {
    prop1: {
      label: '测试1',
      required: true
    },
    prop2: {
      label: '测试2',
      required: true
    },
    prop3: {
      label: '测试3',
      type: 'date'
    },
    prop4: {
      label: '测试4'
    },
    prop5: {
      label: '测试5',
      mapping: {
        'Male': true,
        'Female': false
      }
    }
  });

  export default {
    methods: {
      test() {
        alert(123);
      },

      removeThis(row) {
        var index = this.selection.indexOf(row);
        if (index !== -1) {
          this.selection.splice(index, 1);
        }
      }
    },
    data() {
      return {
        selection: [],
        testData: testSchema.convert([
          {prop1: '11', prop2: '12', prop3: new Date(), prop4: '14', prop5: true},
          {prop1: '21', prop2: '22', prop3: new Date(), prop4: '24', prop5: false},
          {prop1: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: false},
          {prop1: '41', prop2: '42', prop3: new Date(), prop4: '44', prop5: true},
          {prop1: '51', prop2: '52', prop3: new Date(), prop4: '54', prop5: false},
          {prop1: '11', prop2: '12', prop3: 'Tue Dec 17 2015 15:50:04 GMT+0800 (CST)', prop4: '14', prop5: true},
          {prop1: '21', prop2: '22', prop3: '1970-01-01T00:00:12.314Z', prop4: '24', prop5: false},
          {prop1: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: true},
          {prop1: '41', prop2: '42', prop3: new Date(), prop4: '44', prop5: false},
          {prop1: '51', prop2: '52', prop3: new Date(), prop4: '54', prop5: true},
          {prop1: '11', prop2: '12', prop3: new Date(), prop4: '14', prop5: false},
          {prop1: '21', prop2: '22', prop3: new Date(), prop4: '24', prop5: false},
          {prop1: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: true},
          {prop1: '41', prop2: '42', prop3: null, prop4: '44', prop5: false},
          {prop1: '51', prop2: '52', prop3: undefined, prop4: '54', prop5: true}
        ])
      };
    }
  };
</script>