<template>
  <d-panel style="height: 400px;">
    <d-tree :data="data"></d-tree>
    <div style="height: 100px;"></div>
    <d-tree :data="regions" :level-config="levelConfig"></d-tree>
    <div style="height: 100px;"></div>
    <d-tree :data="regions" :level-config="levelConfig2"></d-tree>
  </d-panel>
</template>

<style>
  .leaf {
    width: 20px;
    background: #ddd;
  }

  .folder {
    width: 20px;
    background: #888;
  }
</style>

<script type="text/ecmascript-6">
  var data = [{
    label: 'bb',
    children: [{
      label: 'b1'
    }]
  }, {
    label: 'cc',
    children: [{
      label: 'cc1'
    }, {
      label: 'cc2'
    }]
  }];

  var regions = [
    {
      'name': 'region1'
    },
    {
      'name': 'region2'
    }
  ];

  var count = 1;
  var levelConfig = {
    childrenProperty: 'zones',
    leafIcon: 'leaf',
    icon: 'folder',
    children: {
      lazy: true,
      leafIcon: 'leaf',
      icon: 'folder',
      load: function (callback) {
        var node = this;

        var hasChild = Math.random() > 0.5;
        setTimeout(function () {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + count++
            }, {
              name: 'zone' + count++
            }];
          } else {
            data = [];
          }

          node.children = data;
          if (callback) {
            callback();
          }
        }, 500);
      }
    }
  };

  var levelConfig2 = {
    childrenProperty: 'zones',
    leafIcon: 'leaf',
    icon: 'folder',
    children: {
      recursive: true,
      lazy: true,
      leafIcon: 'leaf',
      icon: 'folder',
      load: function (callback) {
        var node = this;

        var hasChild = Math.random() > 0.5;
        setTimeout(function () {
          var data;
          if (hasChild) {
            data = [{
              name: 'zone' + count++
            }, {
              name: 'zone' + count++
            }];
          } else {
            data = [];
          }

          node.children = data;
          if (callback) {
            callback();
          }
        }, 500);
      }
    }
  };

  export default {
    data() {
      return {
        children: data,
        data: data,
        levelConfig: levelConfig,
        levelConfig2: levelConfig2,
        regions: regions
      }
    }
  };
</script>