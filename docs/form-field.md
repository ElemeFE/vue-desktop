# Overview

FormField 是表单中的表单项，有多种类型，目前支持的类型有：

- field: 内部没有任何编辑器，使用 d-field 标签创建。
- text：内部使用 TextEditor 作为自己的编辑器，使用 d-text-field 创建。
- select：内部使用 Select 作为自己的编辑器，使用 d-select-field 创建。
- checkbox：内部使用 CheckBox 作为自己的编辑器，使用 d-checkbox-field 创建。
- radiogroup： 内部使用 RadioGroup 作为自己的编辑器，使用 d-radiogroup-field 创建。

# Usage

一般情况下，一组 FormField 会有一组公用的属性，这些属性可以在 Form 组件上定义，在 FormField 没有定义该属性的时候，会使用 Form 上的属性作为默认值。

一个简单的例子如下：

```HTML
<d-form :model='user' :schema='userSchema' label-width="140" :cols="1" style="width: 360px;">
  <d-text-field property='userName'></d-text-field>
  <d-text-field property='email'></d-text-field>
  <d-text-field type='password' property='password'></d-text-field>
  <d-text-field type='password' property='confirmPassword'></d-text-field>
  <d-text-field property='comment' type="textarea" :editor-height="60"></d-text-field>
</d-form>
```

# Properties

FormField 通用的属性如下：

| Property | Description |
| ---- | ---- |
| schema | FormField 使用的 Schema。如果没有定义该属性，则默认值从 Form 中取得。 |
| model | FormField 使用的 model，这个 model 可以是一个普通对象，也可以是 Schema 生成的一个 model。 |
| property | FormField 中的编辑器绑定的 model 中的 property。 |
| label | FormField 显示的 label 信息，如果定义了 Schema，没有定义 label 属性，则会从 Schema 中取得。 |
| labelSuffix | FormField 中的 label 的后缀。如果没有定义该属性，则默认值从 Form 中取得。|
| labelWidth | FormField 中的 label 显示的宽度，数值类型。如果没有定义该属性，则默认值从 Form 中取得。|
| required | 是否在 label 的左侧显示一个必填的指示星号，如果定义了 schema 和 property 属性，并且该 property 的 required 属性为 true，则默认会显示必填项的星号。当然，你也可以定义 required 属性为 false 来关闭这个星号的显示。|
| hideLabel | 是否隐藏 FormField 的 label 信息，Boolean 类型，默认值为 false。|

TextField 可以使用的输入如下：

| Property | Description |
| ---- | ---- |
| type | TextField 的类型，可选值：text、textarea、password。|
| editorHeight | 文本框的高度。|
| placeholder | 文本框使用的 placeholder。 |
| editorWidth | 文本框的宽度，可以使用数值和百分比。|

SelectField 可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| multiSelect | 是否可以多选，Boolean 类型，默认值为 false。 |
| emptyRecord | 是否显示一个空的记录在最上方，Boolean 类型，默认值为 false。 |
| editorWidth | Select的宽度，可以使用数值和百分比。|

CheckBoxField 可以使用的属性如下：

| Property | Description |
| ---- | ---- |
| trueValue |  CheckBox 勾选的时候写到 model 中的值。 |
| falseValue | CheckBox 不勾选的时候写到 model 中的值。 |
