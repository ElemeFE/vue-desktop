export default {
  'default': '字段{label}校验失败',
  required: '{label}为必填项',
  pattern: '{label}的格式不正确',
  whitespace: '{label}不能为空',
  'enum': '{label}必须为以下值中的一个: {list}',
  length: {
    'min': '{label}至少有{min}个字符',
    'max': '{label}最多有{max}个字符',
    'range': '{label}的长度应该大于等于{min}并且小于等于{max}'
  },
  range: {
    'min': '{label}应该大于{min}',
    'max': '{label}应该小于{max}',
    'range': '{label}应该介于{min}和{max}之间'
  }
};