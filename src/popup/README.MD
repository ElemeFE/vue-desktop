# Overview
Popup是一个Mixin, 为任何对象添加两个方法: open 和 close.

Popup要求对象有一个方法getDOM, 这个方法返回一个HTMLElement. 

# Usage

Popup可以在open的时候指定自己显示的一些参数, 也可以通过实现getPopupOptions来返回参数的默认值. 

```JavaScript
Popup({
  getPopupOptions: function() {
    return {
      openDelay: 300,
      modal: true
    };
  }
})
```

通过 getPopupOptions 拿到参数和 open 传入参数是可以共用的, open 传入的参数会覆盖 getPopupOptions返回的参数. 

可以使用的属性如下:

- openDelay: 显示Popup的延时，默认值为0。
- closeDelay: 隐藏Popup的延时，默认值为0。
- target: 默认值为null，可以为HTMLElement、Event、Array。
- placement: 只有当target为HTMLElement的时候才起作用，Popup相对于target摆放的位置，可选值有：left、right、top、bottom、innerLeft、innerRight、center，默认值为'top'。
- alignment: 只有当target为HTMLElement的时候才起作用，Popup相对于target布局的位置，可选值有：start、center、end，默认值为'center'。
- adjustLeft: Popup在定位时位置在水平方向的偏移值，默认值为0。
- adjustTop: Popup在定位时位置在垂直方向的偏移值，默认值为0。
- attachToBody: 是否显示把dom添加到body上，默认值为false。
- detachAfterHide: 是否在hide之后把元素从DOM树上移除，默认值为true。
- animation: 在show、hide的时候使用的动画，可选值fade、pop, 默认值为false，即不使用动画。
- openAnimation: show的时候使用的动画，默认值和animation相同。
- closeAnimation: hide的时候使用的动画，默认值和animation相同。
- modal: 是否显示模态层，默认值为false。
- zIndex: 在modal为false的时候该属性才起作用，该属性为dom的style.zIndex的值，默认值为null，即不设置dom的zIndex。
- closeOnPressEscape: 是否在按了Esc之后关闭Popup，在modal为true的时候该属性才起作用，默认值为false。
- closeOnClickModal: 是否在点击了Modal层之后关闭Popup，在modal为true的时候该属性才起作用，默认值为false。
- updatePositionOnResize：是否在window resize之后重新进行定位，默认值为false。