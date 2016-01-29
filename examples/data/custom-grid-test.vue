<template>
  <div>
    <button @click="removeColumn()">Remove Column</button>
    <button @click="clearColumn()">Clear Column</button>
    <button @click="changeData()">Change Data</button>
    <custom-grid :columns="columns" :data="data"></custom-grid>
  </div>
</template>

<style scoped>
</style>

<script type="text/ecmascript-6">
  export default {

    data() {
      return {
        columns: [{
          property: '职位'
        }, {
          property: 'prop2'
        }, {
          property: 'prop3'
        }, {
          property: 'prop4'
        }, {
          property: 'prop5'
        }],

        data: [
          {职位: '11', prop2: '12', prop3: new Date(), prop4: '14', prop5: true},
          {职位: '21', prop2: '22', prop3: new Date(), prop4: '24', prop5: false},
          {职位: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: false},
          {职位: '41', prop2: '42', prop3: new Date(), prop4: '44', prop5: true},
          {职位: '51', prop2: '52', prop3: new Date(), prop4: '54', prop5: false},
          {职位: '11', prop2: '12', prop3: 'Tue Dec 17 2015 15:50:04 GMT+0800 (CST)', prop4: '14', prop5: true},
          {职位: '21', prop2: '22', prop3: '1970-01-01T00:00:12.314Z', prop4: '24', prop5: false},
          {职位: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: true},
          {职位: '41', prop2: '42', prop3: new Date(), prop4: '44', prop5: false},
          {职位: '51', prop2: '52', prop3: new Date(), prop4: '54', prop5: true},
          {职位: '11', prop2: '12', prop3: new Date(), prop4: '14', prop5: false},
          {职位: '21', prop2: '22', prop3: new Date(), prop4: '24', prop5: false},
          {职位: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: true},
          {职位: '41', prop2: '42', prop3: null, prop4: '44', prop5: false},
          {职位: '51', prop2: '52', prop3: undefined, prop4: '54', prop5: true}
        ]
      };
    },

    methods: {
      clearColumn() {
        this.columns = [];
      },
      removeColumn() {
        this.columns.splice(0, 1);
      },
      changeData() {
        this.data = [
          {职位: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: true},
          {职位: '41', prop2: '42', prop3: null, prop4: '44', prop5: false},
          {职位: '51', prop2: '52', prop3: undefined, prop4: '54', prop5: true}
        ];
      }
    },

    components: {
      CustomGrid: require('./custom-grid.vue')
    }
  };
</script>