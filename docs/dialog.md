# Overview

Dialog 是一个对话框组件，在 .vue 文件通过 d-dialog 标签来定义。

```HTML
<d-dialog title="MyDialog" :visible.sync="dialogVisible" width="500">
  ……
</d-dialog>
```

# Usage

Dialog 目前拥有的属性如下：

| Property | Description |
| ---- | ---- |
| title | Dialog 显示的标题。 |
| width | Dialog 的宽度，数值类型。 |
| visible | Dialog 是否可见，Boolean 类型，默认值为 false。一般情况下，请使用 :visible.sync 来和 vm 中的某一个属性做双向绑定。 |

## dialog footer

如果要在 dialog 的底部定义 Button，请这么定义：

```HTML
<d-dialog title="MyDialog" :visible.sync="dialogVisible" width="500">
  ……
  <div slot="dialog-footer">
    <d-button>OK</d-button>
    <d-button @click="dialogVisible = false">Cancel</d-button>
  </div>
</d-dialog>
``` 