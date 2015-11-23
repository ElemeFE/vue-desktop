
# Overview

Grid 是一个数据表格组件，用来展示一组数据。

# Usage

使用 d-grid 标签即可创建一个 Grid 组件。

```HTML
<d-grid :data="gridData" :schema="gridSchema" height="300">
  <d-grid-column type="index"></d-grid-column>
  <d-grid-column type="selection"></d-grid-column>
  <d-grid-column property="prop1"></d-grid-column>
  <d-grid-column property="prop2"></d-grid-column>
  <d-grid-column property="prop3" width="400"></d-grid-column>
  <d-grid-column property="prop4"></d-grid-column>
  <d-grid-column label="5" property="prop5"></d-grid-column>
  <d-grid-column label="操作" width="200">
    <d-button>测试1</d-button>
  </d-grid-column>
</d-grid>
```

其中 gridData 和 gridSchema 的定义如下：

```JavaScript
import { Schema } from 'vue-desktop'

var gridSchema = new Schema({
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
```

```JavaScript
var gridData = [
  {prop1: '11', prop2: '12', prop3: new Date(), prop4: '14', prop5: true},
  {prop1: '21', prop2: '22', prop3: new Date(), prop4: '24', prop5: false},
  {prop1: '31', prop2: '32', prop3: new Date(), prop4: '34', prop5: false},
  {prop1: '41', prop2: '42', prop3: new Date(), prop4: '44', prop5: true},
  {prop1: '51', prop2: '52', prop3: new Date(), prop4: '54', prop5: false}
];
```

# Grid Properties

Grid 目前可用的属性如下：

| Property | Description |
| ---- | ---- |
| data | Grid 显示的数据。 |
| schema | Grid 使用的 Schema。 |
| height | Grid 的高度，默认高度为空，即自动高度。 |
| fit | Grid 的列的宽度是否自撑开，Boolean 类型，默认为 false。|
| selection | 为 Grid 添加了 selection 列之后，选中的列的数据会被写到 selection 属性中。|

# Grid Column Properties

Grid Column 目前可用的属性如下：

| Property | Description |
| ---- | ---- |
| label | Grid Column 显示的标题。如果不设置此属性，并且 Grid 定义了 Schema，并且 Grid Column 定义了property，则从 Schema 中获得 label。 |
| property | Grid Column 要显示的字段名。 |
| width | Grid Column 的宽度。 |
| sortable | Grid Column 是否可以排序，在设置了 property 的情况下，该属性的默认值为 true，反之为 false。 |
| type | Grid Column 的类型，默认为空，可选值：selection、index。如果设置了 selection 则显示多选按钮，如果设置了 index，则显示该行的索引（从1开始计算）。 |

## Grid Column中的内容

Grid Column 中可以定制该列显示的内容，在 Grid Column 中，可以使用 row 属性访问到每一行的数据。

比如想为上面例子中的 prop2 列的显示内容之后添加一个前缀，比如是『￥』。

那么，可以这么定义该列：
```HTML
<d-grid-column property="prop2">￥{{row.prop2}}</d-grid-column>
```
