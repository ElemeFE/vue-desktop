import { Schema } from '../../src/index.js';

export default new Schema({
  nickname: {
    label: 'NickName',
    required: true
  },

  password: {
    label: 'Password',
    required: true
  },

  birthday: {
    label: 'Birthday',
    type: 'date',
    default() {
      return new Date();
    }
  },

  sex: {
    label: 'Sex',
    default: 'female',
    trueValue: 'male',
    falseValue: 'female'
  },

  comment: {
    label: 'Comment'
  },

  count: {
    label: 'Number',
    type: 'integer'
  },

  simpleMapping: {
    label: 'Mapping',
    mapping: {
      'Simple-0': 0,
      'Simple-1': 1,
      'Simple-2': 2,
      'Simple-3': 3,
      'Simple-4': 4,
      'Simple-5': 5
    }
  }
});
