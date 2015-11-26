# Overview

Breadcrumb 组件用于创建面包屑导航。

# Usage

使用 d-breadcrumb 和 d-breadcrumb-item 标签即可创建 Breadcrumb 组件：

```HTML
  <d-breadcrumb>
    <d-breadcrumb-item>首页</d-breadcrumb-item>
    <d-breadcrumb-item link="/tabs">Tabs</d-breadcrumb-item>
    <d-breadcrumb-item link="/accordion">Accordion</d-breadcrumb-item>
    <d-breadcrumb-item link="/breadcrumb">Breadcrumb</d-breadcrumb-item>
  </d-breadcrumb>
```

# Properties

d-breadcrumb-item 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| link | 链接地址, 若不赋值则该项不可点击。 |

Breadcrumb 组件会自动判断当前页面的 URL 是否与某个 d-breadcrumb-item 的 link 属性相同, 若相同则会为该 d-breadcrumb-item 添加一些样式, 用来提示用户当前所在的位置。