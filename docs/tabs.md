## Overview

tabs 是一个常见的标签页组件，使用方式如下：

```Vue
<d-tabs>
  <d-tab tltle="Test" closable></d-tab>
</d-tabs>
```

## Tabs

通过 d-tabs 在 .vue 中定义一个 Tabs 组件，Tabs 目前没有提供属性支持，后续会陆续添加。

## Tab

通过 d-tab 在 Tabs 中添加一个 Tab 组件，Tab 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| title | Tab 上显示的标题。 |
| icon | Tab 上显示的 icon 使用的 className。 |
| disabled | Tab 是否处于 disabled 状态，Boolean 类型，默认值为 false。 |
| closable | Tab 是否可以关闭，Boolean 类型，默认值为 false。|