export default {
  validator: {
    'default': '字段{label}校验失败',
    required: '{label}为必填项',
    pattern: '{label}的格式不正确',
    whitespace: '{label}不能为空',
    'enum': '{label}必须为以下值中的一个: {list}',
    length: {
      'min': '{label}至少有{min}个字符',
      'max': '{label}最多有{max}个字符',
      'range': '{label}的长度应该大于等于{min}并且小鱼等于{max}'
    },
    range: {
      'min': '{label}应该大于{min}',
      'max': '{label}应该小于{max}',
      'range': '{label}应该介于{min}和{max}之间'
    }
  },
  datepicker: {
    today: '今天',
    clear: '清空',
    confirm: '确定',
    weeks: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    },
    months: {
      jan: '一月',
      feb: '二月',
      mar: '三月',
      apr: '四月',
      may: '五月',
      jun: '六月',
      jul: '七月',
      aug: '八月',
      sep: '九月',
      oct: '十月',
      nov: '十一月',
      dec: '十二月'
    }
  },
  alert: {
    title: '提示'
  }
};
