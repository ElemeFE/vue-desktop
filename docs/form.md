# Overview

Form 可以定义列数，并为 FormField 定义一些公用属性。

# Usage

使用 d-form 即可创建一个 Form，例子如下：

```HTML
<d-form :cols="2" :schema="schema" :model="model">
  ...
</d-form>
```

# Properties

Form 可以使用的属性如下

| Property | Description |
| ---- | ---- |
| cols | Form 显示的列数，数值类型，默认值为1。  |
| schema | Form 中的 FormField 使用的 Schema。 |
| model | Form 中的 FormField 使用的 model。 |
| labelWidth | Form 中的 FormField 的 labelWidth 的默认值。|
| labelSuffix | Form 中的 FormField 的 labelSuffix 的默认值。|
| editorWidth | Form 中的 FormField 的 editorWidth 的默认值。|