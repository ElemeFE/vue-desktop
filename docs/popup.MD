# Overview
Popup是一个Mixin, 为任何对象添加两个方法: open 和 close.

# Usage

Popup可以在open的时候指定自己显示的一些参数, 也可以通过实现popupOptions属性来返回参数的默认值。

```JavaScript
import { Popup } from 'vue-desktop'

export default {
    mixins: [ Popup ],

    computed: {
      popupOptions() {
        return {
          target: 'center',
          animation: false,
          modal: true,
          modalClass: 'loading-mask-modal',
          closeDelay: 300,
          updatePositionOnResize: true
        };
      }
    },

    props: {
      text: {}
    }
}
```

通过 popupOptions 拿到参数和 open 传入参数是可以共用的, open 传入的参数会覆盖 popupOptions 返回的参数。

可以使用的属性如下:

- openDelay: 显示 Popup 的延时，默认值为 0。
- closeDelay: 隐藏 Popup 的延时，默认值为 0。
- target: 默认值为 null，可以为 HTMLElement、Event、Array。
- placement: 只有当 target 为 HTMLElement 的时候才起作用，Popup 相对于 target 摆放的位置，可选值有：left、right、top、bottom、innerLeft、innerRight、center，默认值为'top'。
- alignment: 只有当 target 为 HTMLElement 的时候才起作用，Popup 相对于 target 布局的位置，可选值有：start、center、end，默认值为 'center'。
- adjustLeft: Popup 在定位时位置在水平方向的偏移值，默认值为0。
- adjustTop: Popup 在定位时位置在垂直方向的偏移值，默认值为0。
- modal: 是否显示模态层，默认值为 false。
- modalClass：模态层使用的 className。
- zIndex: 在 modal 为 false 的时候该属性才起作用，该属性为 dom 的 style.zIndex的值，默认值为 null，即不设置 dom 的 zIndex。
- closeOnPressEscape: 是否在按了 Esc 之后关闭 Popup，在 modal 为 true 的时候该属性才起作用，默认值为 false。
- closeOnClickModal: 是否在点击了 Modal 层之后关闭 Popup，在 modal 为true的时候该属性才起作用，默认值为 false。
- updatePositionOnResize：是否在 window resize 之后重新进行定位，默认值为 false。