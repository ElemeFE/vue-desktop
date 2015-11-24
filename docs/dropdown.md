# Overview

Dropdown 组件用于创建下拉菜单。

# Usage

使用 d-dropdown-button, d-dropdown-item, d-dropdown-divider 标签即可创建 Dropdown 组件, d-dropdown-button 创建下拉按钮, d-dropdown-item 创建菜单项, d-dropdown-divider 创建菜单项之间的分割线：

```HTML
  <d-dropdown-button title="下拉列表" position="bottom">
    <d-dropdown-item name="1">第一个菜单项</d-dropdown-item>
    <d-dropdown-item name="2">第二个菜单项</d-dropdown-item>
    <d-dropdown-item disabled name="3">第三个菜单项(不可用)</d-dropdown-item>
    <d-dropdown-divider></d-dropdown-divider>
    <d-dropdown-item name="4">第四个菜单项</d-dropdown-item>
  </d-dropdown-button>
```

# Properties

d-dropdown-button 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| title | 显示在下拉按钮上的文字。 |
| trigger | 下拉菜单的触发方式, 设置为 "click" 时通过点击触发, 设置为 "mouseenter" 时通过鼠标移入触发。触发默认值为 "click"。 |
| position | 下拉菜单相对于下拉按钮的的位置, 可设置为 "top", "bottom", "left" 或 "right", 默认值为 "bottom"。 |

d-dropdown-item 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| disabled | 添加 disabled 属性即可让菜单项处于不可选状态。 |
| name | 用户选择某个菜单项时, 传向回调函数的值。 |

当用户选择某个菜单项时, 会触发 @select 事件, 调用相应的回调函数, 该回调函数的参数即为被选中菜单项的 name 值。绑定事件的方法如下:
 
 ```HTML
  <d-dropdown-button title="下拉列表" @select="selectFunc">
    <d-dropdown-item name="1">第一个菜单项</d-dropdown-item>
    <d-dropdown-item name="2">第二个菜单项</d-dropdown-item>
  </d-dropdown-button>
 ```