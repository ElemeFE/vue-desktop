# Overview

Alert 用于向用户显示警告信息。

# Usage

使用 d-alert 标签即可创建一个 Alert 组件：

```HTML
  <d-alert title="消息" type="info" closable>
    消息提示的示例
  </d-alert>
```

# Properties

Alert 目前可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| title | Alert 上显示的标题, 默认值为"提示"。 |
| type | Alert 的类型, 共有"success", "info", "warning", "error"四种, 默认值为"info"。 |
| closable | Alert 是否可以关闭，Boolean 类型，默认值为 false。 |
| closeText | Alert 关闭按钮的文本（若 Alert 可关闭），不为该属性赋值则显示&times;。 |

Alert 组件在关闭后会触发 close 事件, 绑定事件的方法如下：
 
 ```HTML
  <d-alert title="错误" type="error" closable close-text="知道了" @close=closeFunc>
     绑定事件的示例
  </d-alert>
 ```