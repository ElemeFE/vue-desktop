<template>
  <d-panel style="height: 400px;">
    <d-tree :data="data"></d-tree>
    <d-tree :data="regions" :level-config="levelConfig"></d-tree>
  </d-panel>
</template>

<script type="text/ecmascript-6" lang="babel">
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

    children: {
      lazy: true,
      load: function (callback) {
        var node = this;

        var hasChild = Math.random() > 0.1;
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
        regions: regions
      }
    }
  };
</script>