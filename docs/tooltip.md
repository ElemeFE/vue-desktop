# Overview

Tooltip 是 vue-desktop 提供的一个directive，并不是一个组件 不能单独实例化。


# Usage
在需要显示 tooltip 的组件上添加 v-tooltip 这个属性，即可激活这个功能。在 v-tooltip 之外，你还可以定义 tooltip-placement、tooltip-content、tooltip-delay、tooltip-trigger 等属性。

```HTML
<d-button v-tooltip tooltip-placement="right" tooltip-content="test">Right Tooltip</d-button>
```

# Properties
请在使用的时候为属性添加上 tooltip- 前缀。

| Property | Description |
| ---- | ---- |
| placement | Tooltip 显示的位置，默认值为 bottom。 |
| content | Tooltip 中显示的内容。 |
| delay | Tooltip 打开的延时，默认无延时。 |
| trigger | Tooltip 触发的方式，默认为 mouseenter，可选值 mouseenter、click、focus。 |
