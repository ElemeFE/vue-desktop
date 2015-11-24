# Overview

Slider 组件用于创建滑动条。

# Usage

使用 d-slider 标签即可创建 Slider 组件：

```HTML
  <d-slider :min=10 :max=20 :step=2 :default-value=16></d-slider>
```

# Properties

Slider 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| min | 滑动条的最小值, 默认值为0。 |
| max | 滑动条的最大值, 默认值为100。 |
| step | 滑动条的步长, 默认值为1。 |
| defaultValue | 滑动条加载完成时显示的值, 默认等于 min 属性的值。 |
| showInput | 是否在滑动条右侧显示一个输入框, Boolean 类型，默认值为 false。设置为 true 时, 可通过该输入框控制滑动条的值。 |

当滑动条的值发生变化时, 会触发 @change 事件, 调用相应的回调函数, 该回调函数的参数为滑动条的值。绑定事件的方法如下:
 
 ```HTML
  <d-slider @change="changeFunc"></d-slider>
 ```