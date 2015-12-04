# Overview

Panel 是一个面板组件，可以显示内容区的标题，折叠展开，并可以在标题栏添加其他组件。

# Usage

使用 d-panel 即可以创建一个 Panel 组件：

```HTML
<d-panel title="Title">
  ...
</d-panel>
```

如果要在标题右侧添加一些按钮，则可以使用 Vue 的 slot 功能：
```HTML
<d-panel title="Editors">
  <span slot="header">
    <d-button-group>
      <d-button>测试</d-button>
      <d-button>测试</d-button>
      <d-button>测试</d-button>
    </d-button-group>

    <d-button style="float: right;">测试</d-button>
  </span>
  ...
</d-panel>  
```

# Properties

Panel 目前只有 title 一个属性，其他属性会陆续添加。

| Property | Description |
| ---- | ---- |
| title | Panel 显示的标题。 |
| expaned | Panel 是否展开，Boolean 类型，默认值为 true。 |