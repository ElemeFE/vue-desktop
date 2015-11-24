<template>
  <d-panel style="height: 400px;">
    <d-tree :nodes="regions" :level-config="levelConfig"></d-tree>
  </d-panel>
</template>

<script type="text/ecmascript-6" lang="babel">
  var data = [{
    name: 'b', label: 'bb',
    children: [{
      name: 'b1', label: 'b1'
    }]
  }, {
    name: 'c', label: 'cc',
    children: [{
      name: 'c1', label: 'cc1'
    }, {
      name: 'c2', label: 'cc2'
    }]
  }];

  var regions = [
    {
      'type': 2,
      'name': '事业部1',
      'zones': [
        {
          'groups': [
            {
              'camps': [
                {
                  'areas': null,
                  'id': 692,
                  'name': '白领武汉武昌战营1'
                }
              ],
              'id': 691,
              'name': '白领湖北战团'
            }
          ],
          'id': 712,
          'name': '白领华东战区'
        }
      ]
    },
    {
      'type': 1,
      'name': '事业部2',
      'zones': [
        {
          'groups': [
            {
              'camps': [
                {
                  'areas': [
                    {
                      'id': 54,
                      'name': '哈哈'
                    },
                    {
                      'id': 55,
                      'name': '哈哈'
                    }
                  ],
                  'id': 781,
                  'name': '高校成都双流战营'
                }
              ],
              'id': 903,
              'name': '高校成都战团'
            },
            {
              'camps': [
                {
                  'areas': [
                    {
                      'id': 78,
                      'name': '哈哈'
                    }
                  ],
                  'id': 780,
                  'name': '高校成都双流战营'
                }
              ],
              'id': 903,
              'name': '高校成都战团'
            }
          ],
          'id': 948,
          'name': '高校川渝战区'
        }
      ]
    }
  ];

  var count = 1;
  var levelConfig = {
    id: 'type',

    childrenProperty: 'zones',

    children: {
      childrenProperty: 'groups',
      children: {
        childrenProperty: 'camps',
        children: {
          childrenProperty: 'areas',
          children: {
            lazy: true,
            load: function (callback) {
              var node = this;

              var hasChild = Math.random() > 0.9;
              setTimeout(function () {
                var data;
                if (hasChild) {
                  data = [{
                    id: 'xxx' + count++,
                    name: count++
                  }, {
                    id: 'xxx' + count++,
                    name: count++
                  }];
                } else {
                  data = [];
                }

                node.childrenData = data;
                if (callback) {
                  callback();
                }
              }, 500);
            }
          }
        }
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