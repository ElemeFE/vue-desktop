# 简介
Notification 用来弹出通知消息。

# 用法

## 引用

```JavaScript
import { Notification } from 'vue-desktop'
```

## 用法

使用方法如下：

    Notification({
      title: '通知',
      message: '通知信息',
      type: 'error',
      duration: 3,
      callback: function(instance) {
        console.log(instance.id + ' is closed.');
      }
    });

# 参数列表
目前 Notification 支持如下参数：

- title: Notification 显示的标题。
- message: Notification 显示的内容。
- type: Notification 显示的图标的类型，可选值：success、info、warning、error，默认值为 info。
- duration: Notification 显示的时长，单位为秒，默认值为 5。设置为 0 则会一直显示，直到用户手动关闭。
- callback: Notification 关闭后的回调函数，参数 instance 为对应于该 Notification 的 Vue 实例对象，它具有上述四个属性，instance.id 为唯一性标识。