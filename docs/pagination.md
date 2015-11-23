# Overview

Pagination 是一个分页组件，可以实现常见的分页功能。

# Usage

使用 d-pagination 标签即可创建一个 Pagination 组件：

```HTML
<d-pagination :item-count="itemCount" current-page="1"></d-pagination>
```

# Properties

Pagination 目前可用的属性如下：

| Property | Description |
| ---- | ---- |
| pageSize | 每一页数据的长度，默认值为10。 |
| itemCount | 数据的总数目，默认值为0。 |
| currentPage | 当前是第几页，没有默认值。|

Pagination 在用户点击页码切换 currentPage 的时候，会触发 change 事件，可以这么绑定该事件：

```HTML
<d-pagination :item-count="itemCount" current-page="1" @change="handlePageChange"></d-pagination>
```
