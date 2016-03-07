# Overview

NavMenu 是一个导航菜单，可以支持多级菜单。

# Usage

使用 d-nav-menu 即可创建一个 NavMenu 组件，在 NavMenu 里面使用 d-nav-menu-item 即可定义菜单项。

```HTML
<d-nav-menu>
  <d-nav-menu-item text="test" expanded>
    <d-nav-menu-item text="test"></d-nav-menu-item>
    <d-nav-menu-item text="test">
      <d-nav-menu-item text="test"></d-nav-menu-item>
    </d-nav-menu-item>
    <d-nav-menu-item text="test">
      <d-nav-menu-item text="test"></d-nav-menu-item>
    </d-nav-menu-item>
  </d-nav-menu-item>
  <d-nav-menu-item text="test"></d-nav-menu-item>
</d-nav-menu>
```

# Properties

NavMenu 的属性如下：
| Property | Description |
| ---- | ---- |
| exclusive | 是否排他展开，Boolean 类型，默认值为 true。 这个属性只对第一级的 NavMenuItem 起作用，如果是二级、三级，则需要指定子 NavMenu 的 exclusive 的属性。 |


NavMenuItem 的属性如下：

| Property | Description |
| ---- | ---- |
| text | 显示的文本。 |
| path | Item 对应的路径，类似使用 v-link 中的 path。 |
| exact | 是否路径完全匹配的时候才高亮 NavMenuItem，Boolean 类型，默认值为 false。 |
| expanded | 是否展开，Boolean 类型，默认值为 false。 |
| exclusive | 是否排他展开，Boolean 类型，默认值为 false。 |

