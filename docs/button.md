# Overview

Button 组件用于创建各种按钮, Button-group 可创建按钮组。

# Usage

使用 d-button 标签即可创建一个 Button 组件：

```HTML
  <d-button type="primary">Primary Button</d-button>
```

使用 d-button-group 标签来创建一个按钮组, 需在其中嵌套若干个由 d-button 标签创建的按钮：

```HTML
  <d-button-group>
    <d-button>左</d-button>
    <d-button>中</d-button>
    <d-button>右</d-button>
  </d-button-group>
```

# Properties

Button 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| type | Button 的颜色主题, 可设置为 "primary", "success", "info", "warning", "danger", 若不设置则为默认主题。 |
| size | Button 的尺寸, 可设置为 "large" 或 "small", 若不设置则尺寸为中。 |
| disabled | 添加 disabled 属性即可让按钮处于不可用状态，同时按钮样式也会改变。 |
| icon | 显示在按钮文字前的图标, 值为 Icon 组件的类名。 |

Button-group 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| size | Button-group 的尺寸, 可设置为 "large" 或 "small", 若不设置则尺寸为中。无需再为 Button-group 中的 Button 组件设置尺寸。 |
| exclusive | Button-group 中可被选中的 Button 是否唯一, Boolean 类型，默认值为 true。 |

嵌套于 Button-group 组件中的 Button 组件还可设置如下两个属性：

| Property | Description |
| ---- | ---- |
| selected | 添加 selected 属性即可让 Button 组件处于默认选中状态。 |
| value | Button-group 组件中被选中的 Button 发生变化时, 传向回调函数的值。 |

关于最后一个 value 属性：
当用户通过点击按钮, 使 Button-group 组件中被选中的 Button 发生变化时, 会触发 @select 事件, 调用相应的回调函数, 该回调函数的参数即为目前被选中的各 Button 组件的 value 值所组成的数组。绑定事件的方法如下:
 
 ```HTML
  <d-button-group  @select="selectFunc">
    <d-button value="1">全部商家</d-button>
    <d-button value="2">甜品饮品</d-button>
    <d-button value="3">小吃零食</d-button>
    <d-button selected value="4">鲜花蛋糕</d-button>
    <d-button value="5">果蔬生鲜</d-button>
  </d-button-group>
 ```