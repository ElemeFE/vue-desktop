# Overview

Tree 是用来展现树形结构的组件，节点支持多选，节点可以显示图标。

# Usage

Tree 的使用可以依赖于 levelConfig，也可以不依赖于 levelConfig。
- 在简单的场景下，可以不使用 levelConfig，但是要求 data 属性的格式为指定的格式。
- 假设每一个层级的数据都不一样，有点层级可能还是在需要显示的时候才去服务器加载数据。在这种情况下，需要使用 levelConfig 来定义每一个层级的数据。

## 不使用 levelConfig

在不使用 levelConfig 的情况下，要求节点使用的文本使用 label 属性来定义，子节点使用 children 属性来定义，一个简单的例子如下：

```JavaScript
export default {
  data() {
    return {
      data: [{
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
      }]
    }
  }
}
```

```HTML
<d-tree :data="data"></d-tree>
```

## 使用 levelConfig

对 Tree 的每一个层级的节点来讲，每一个节点需要从 JavaScript 中的一个对象映射过来。对于数据来讲，需要关注的点有这么几个：label 用的属性是哪一个，children 用的属性是哪一个，以及下级节点与数据的映射关系。

举例来讲，我们有一个两级的树，第一级叫 regions，第二级叫 zones：
- 第一级的数据使用的 label 使用 name 属性。在 label 显示为 label或name 的情况下，无需指定 labelProperty。
- 第二级是一个懒加载的，例子里面我们使用一个虚拟的加载，使用 setTimeout 做一个简单的模拟，在500ms后有50%的概率返回两条数据。

那么，levelConfig 这么定义：

```JavaScript
var count = 1;
var levelConfig = {
  childrenProperty: 'zones',

  children: {
    lazy: true,
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
```

数据为：
```JavaScript
var regions = [
  {
    'name': 'region1'
  },
  {
    'name': 'region2'
  }
];
```

HTML 为：

```HTML
<d-tree :data="regions" :level-config="levelConfig"></d-tree>
```

# Properties

Tree 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| data | 数组类型。 |
| levelConfig | 树的层级定义，具体使用说明请参考下面的表格。  |

Tree 目前可以使用的方法如下：

- getCheckedNodes(leafNodeOnly): 取得目前所有选中的节点，leafNodeOnly 用来表明是否只获取叶子节点，默认值为 false。

levelConfig可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| labelProperty | label 使用的属性是哪一个，如果需要使用 name 或者 label 作为节点的文本，则无需定义该属性。 |
| childrenProperty | children 使用的属性是哪一个，如果为 children，则无需定义该属性。 |
| children | 下级节点的配置。 |
| lazy | 节点是否懒加载，默认为 false。 |
| load | 如果 lazy 属性为 true，在需要展现该节点的时候，会使用 load 方法 来加载数据。 |
