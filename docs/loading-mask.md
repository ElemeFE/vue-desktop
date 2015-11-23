# Overview

LoadingMask 是 vue-desktop 提供的一个 Service，用来在用户提交数据的时候，页面上显示一个半透明的层，阻止用户的进一步操作。

# Usage

LoadingMask 有两种使用方式：
1. 使用 API 手动调用。
2. 使用 Directive。

## 手动调用

LoadingMask 只提供了两个方法：open、close。open 用来打开 LoadingMask，close 用来关闭 LoadingMask。

```JavaScript
import { LoadingMask } from 'vue-desktop'
LoadingMask.open();
setTimeout(function() {
  LoadingMask.close();
}, 1000);
```

## 使用 Directive

使用 Directive 需要用户在自己的方法中返回一个 Promise：
1. 在 Promise 返回之后，打开 LoadingMask。
1. 在 Promise resolve 或者 reject 之后，关闭 LoadingMask。

假设目前有这么一个 Button，需要在 doAction 的时候显示一个 LoadingMask，在 doAction 中的行为执行结束的时候，隐藏 LoadingMask。HTML 中是这么定义的：

```HTML
<d-button @click="doAction()">Do Something need stop user action</d-button>
```

那么如果要想系统智能的显示隐藏 LoadingMask，修改这段 HTML 为如下内容：
```HTML
<d-button v-action="doAction()">Show Loading Mask By Directive</d-button>
```

doAction 的代码如下：
```JavaScript
var doAction = function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(1);
    }, 1000);
  });
}
```
