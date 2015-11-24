# Overview

Progress-bar 组件用于创建进度条。

# Usage

使用 d-progress-bar 标签即可创建 Progress-bar 组件：

```HTML
  <d-progress-bar :percent=30 type="warning"></d-progress-bar>
```

# Properties

Slider 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| percent | 进度条的百分值, 默认值为0。 |
| type | 进度条的颜色主题, 可设置为"success", "info", "warning", "error", 默认值为 "info"。 |
| showPercent | 是否在进度条的右侧显示百分值, Boolean 类型，默认值为 true。 |
| barHeight | 进度条的高度, 单位为px, 默认值为15。 |