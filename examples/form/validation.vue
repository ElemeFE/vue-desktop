<template>
  <d-panel title="Validation Example">
    <d-form :model='user' :schema='userSchema' label-width="140" :cols="1" style="width: 360px;">
      <d-text-field property='userName' :hide-hint="true"></d-text-field>
      <d-text-field property='email'></d-text-field>
      <d-text-field type='password' property='password'></d-text-field>
      <d-text-field type='password' property='confirmPassword'></d-text-field>
      <d-text-field property='comment' type="textarea" :editor-height="60"></d-text-field>
      <d-field>
        <d-button @click="reset()">重置</d-button>
      </d-field>
    </d-form>
  </d-panel>
</template>

<script type="text/ecmascript-6">
  import { Schema } from '../../src/index.js';

  var userSchema = new Schema({
    userName: {
      label: '用户名',
      whitespace: false,
      required: true
    },

    email: {
      label: 'Email',
      required: true
    },

    password: {
      label: '密码',
      required: true,
      minLength: 6,
      maxLength: 20
    },

    confirmPassword: {
      label: '确认密码',
      required: true,
      minLength: 6,
      maxLength: 20,
      rules: {
        type: 'custom',
        message: '两次输入的密码不一致',
        validate() {
          return this.password === this.confirmPassword;
        }
      }
    },

    comment: {
      label: '备注'
    }
  });

  export default {
    methods: {
      validate() {
        userSchema.validate(this.user);
      },

      reset() {
        this.user.reset();
      }
    },

    data() {
      return {
        userSchema: userSchema,
        user: userSchema.newModel()
      };
    }
  };
</script>