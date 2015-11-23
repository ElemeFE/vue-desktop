# 简介
MessageBox 是一个类似 SweetAlert 的组件，用来替代浏览器的 alert 和 confirm。

# 用法

## 引用

```JavaScript
import { MessageBox } from 'vue-desktop'
```

## 不需要callback

在不需要callback的情况下，只需要这么使用即可：

    MessageBox("Good job!", "You clicked the button!", "success");

第一个参数为 title，第二个参数为 message，第三个参数为 type。

## 需要callback

在需要 callback 的情况下，需要这么使用：

    MessageBox({
      title: 'I'm a title',
      message: 'I'm a message',
      type: 'success',
      showCancelButton: true
    }, function(action) {
      console.log('callback:', action);
      MessageBox('你点击了: ' + action);
    });

如果 callback 返回一个 false，则可以阻止 MessageBox 的关闭，你可以使用 MessageBox.close() 来关闭所有的 MessageBox。

## 需要自定义按钮
如果默认 Button 的样式无法满足你的需求，可以使用自定义按钮来完成你需要的功能。

自定义按钮使用buttons属性来配置，该属性为数组，每个button可以定义这么两个属性：

- action: 触发的action，会在callback里面传入。
- content: button的HTML。

举例说明：

    MessageBox({
      title: 'Title',
      message: 'Message',
      showConfirmButton: false,
      buttons: [{
        action: 'test',
        content: '<button>Test</button>'
      }]
    }, function(action) {
      if (action === 'test') {
        MessageBox('自定义Button测试', '你点击了：' + action);
      }
    });

# 参数列表
目前MessageBox支持如下参数：

- title: MessageBox显示的标题。
- message: MessageBox显示的内容。
- type: MessageBox显示的图标的类型，可选值：success、warning、error，默认值为空。
- showConfirmButton: 是否显示确定按钮，默认值为true。
- showCancelButton: 是否显示取消按钮，默认值为false。
- confirmButtonText: 确定按钮显示的文本，默认值为『确定』。
- confirmButtonDisabled: 确定按钮是否不可点击，默认值为false。
- cancelButtonText: 取消按钮显示的文本，默认值为『取消』。
- confirmButtonClass: 确定按钮的className，默认值为空。注：msgbox-confirm这个class是一定存在的。
- cancelButtonClass: 取消按钮的className，默认值为空。注：msgbox-cancel这个class是一定存在的。
