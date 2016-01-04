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
| layout | 分页组件中内容的排列，默认值为: first, prev, manual, next, last, slot, ->, info。详细设置见下面的表格。 |
| pageSizeList | 在显示 List 的情况下，所有可切换的 pageSize 的大小。数组类型，默认值为 [ 10, 20, 30, 40, 50, 100 ]。|

layout 的所有可选项:

| Property | Description |
| ---- | ---- |
| first, last | 第一个和最后一个的按钮。|
| prev, next | 上一页和最后一页的按钮。|
| manual | 显示 第 a 页, 共 b 页的信息，用户可以修改 a 的值。|
| list | 显示 pageSizeList，就是用户可以修改的 pageSize 的列表。|
| slot | Vue 中的 slot 的位置。|
| -> | 左右分割的标识，-> 左侧的内容会显示在左侧，-> 右侧的内容会显示在右侧。|
| info | 显示共有多少数据，现在显示的数据的范围。|
| pager | 互联网风格的分页显示。|

Pagination 在用户点击页码切换 currentPage 的时候，会触发 current-change 事件，可以这么绑定该事件：

```HTML
<d-pagination :item-count="itemCount" current-page="1" @current-change="handlePageChange"></d-pagination>
```
