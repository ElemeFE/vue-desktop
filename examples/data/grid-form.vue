<template>
  <d-vbox style="height: 100%;">
    <d-form schema="Test" :model="item" >
      <d-text-field property="prop1"></d-text-field>
      <d-text-field property="prop2"></d-text-field>
      <d-field>
        {{ item ? item.prop1 : '' }}, {{ item ? item.prop2 : '' }}
      </d-field>
      <d-field>
        <d-button @click="writeBack()">WriteBack</d-button>
      </d-field>
    </d-form>

    <d-grid :data="testData" schema="Test" :fit="true" @row-click="handleClick2" flex>
      <d-grid-column type="index"></d-grid-column>
      <d-grid-column property="prop1"></d-grid-column>
      <d-grid-column property="prop2"></d-grid-column>
      <d-grid-column property="prop3" width="400"></d-grid-column>
      <d-grid-column property="prop4"></d-grid-column>
      <d-grid-column label="5" property="prop5"></d-grid-column>
    </d-grid>
  </d-vbox>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { SchemaStore } from '../../src/index.js'

  var TestSchema = SchemaStore.defineSchema('Test', {
    prop1: {
      label: '测试1',
      required: true
    },
    prop2: {
      label: '测试2',
      required: true
    },
    prop3: {
      label: '测试3'
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
      removeThis(row) {
        var index = this.selection.indexOf(row);
        if (index !== -1) {
          this.selection.splice(index, 1);
        }
      },
      handleClick2(row) {
        this.item = row;
      },
      handleClick(row) {
        Object.assign(this.item, row);
        this.editingRow = row;
      },
      writeBack() {
        Object.assign(this.editingRow, this.item);
      }
    },
    data() {
      return {
        editingRow: null,
        item2: TestSchema.$new(),
        item: null,
        testData: [
          {prop1: '11', prop2: '12', prop3: '13', prop4: '14', prop5: true},
          {prop1: '21', prop2: void 0, prop3: '23', prop4: '24', prop5: false},
          {prop1: '31', prop2: void 0, prop3: '33', prop4: '34', prop5: false},
          {prop1: '41', prop2: void 0, prop3: '43', prop4: '44', prop5: true},
          {prop1: '51', prop2: void 0, prop3: '53', prop4: '54', prop5: false}
        ]
      };
    }
  };
</script>