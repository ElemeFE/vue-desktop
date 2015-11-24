# Overview

Accordion 组件用于创建手风琴导航。

# Usage

使用 d-accordion 和 d-accordion-panel 标签即可创建 Accordion 组件：

```HTML
  <d-accordion>
    <d-accordion-panel title="标题一" active>
      这是标题一的内容
    </d-accordion-panel>
    <d-accordion-panel title="标题二">
      这是标题二的内容<br />这是标题二的内容
    </d-accordion-panel>
    <d-accordion-panel title="标题三">
      这是标题三的内容<br />这是标题三的内容<br />这是标题三的内容
    </d-accordion-panel>
    <d-accordion-panel title="标题四">
      这是标题四的内容
    </d-accordion-panel>
  </d-accordion>
```

# Properties

d-accordion 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| type | 手风琴的颜色主题, 可设置为"default" 或 "transparent", 默认值为 "default"。当设置为 "transparent" 时, 组件背景色为透明, 用户可为其添加自定义的样式。 |

d-accordion-panel 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| title | 面板的标题文本 |
| active | 添加 active 属性可让面板处于激活状态。 |
| disabled | 添加 disabled 属性可让面板处于不可用状态。 |
