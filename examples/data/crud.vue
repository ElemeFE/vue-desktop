<template>
  <d-vbox style="height: 100%;">
    <d-panel title="Query Condition" style="margin-bottom: 10px;">
      <d-form :schema="querySchema" :model="item" :cols="3" :label-width="100">
        <d-text-field property="userName"></d-text-field>
        <d-text-field property="email"></d-text-field>
        <d-text-field property="phone"></d-text-field>
      </d-form>
      <div>
        <d-button type="primary" style="margin-left: 110px;">Query</d-button>
        <d-button style="float: right;" @click="$dispatch('addUser', row)">Add New User</d-button>
      </div>
    </d-panel>

    <d-grid :data="users" :schema="userSchema" flex>
      <d-grid-column type="index"></d-grid-column>
      <d-grid-column property="userName"></d-grid-column>
      <d-grid-column property="sex" width="80"></d-grid-column>
      <d-grid-column property="email"></d-grid-column>
      <d-grid-column property="phone" width="120"></d-grid-column>
      <d-grid-column property="comment"></d-grid-column>
      <d-grid-column label="Operation" width="120">
        <d-button @click="$dispatch('editUser', row)">Edit</d-button>
        <d-button>Delete</d-button>
      </d-grid-column>
    </d-grid>
  </d-vbox>

  <d-dialog title="Edit User" :visible.sync="editDialogVisible">
    <d-form :schema="userSchema" :model="editUser" :cols="2">
      <d-text-field property="userName"></d-text-field>
      <d-text-field property="email"></d-text-field>
      <d-text-field property="phone"></d-text-field>
      <d-checkbox-field property="sex"></d-checkbox-field>
      <d-text-field class="d-cell-1-1" property="comment" type="textarea" :editor-height="100"></d-text-field>
    </d-form>
    <div slot="dialog-footer">
      <d-button type="primary" @click="confirmEditingUser()">Save</d-button>
      <d-button @click="editDialogVisible = false">Cancel</d-button>
    </div>
  </d-dialog>

  <d-dialog title="Add User" :visible.sync="addDialogVisible">
    <d-form :schema="userSchema" :model="newUser" :cols="2">
      <d-text-field property="userName"></d-text-field>
      <d-text-field property="email"></d-text-field>
      <d-text-field property="phone"></d-text-field>
      <d-checkbox-field property="sex"></d-checkbox-field>
      <d-text-field class="d-cell-1-1" property="comment" type="textarea" :editor-height="100"></d-text-field>
    </d-form>
    <div slot="dialog-footer">
      <d-button type="primary" @click="confirmAddUser()">Save</d-button>
      <d-button @click="cancelAddUser()">Cancel</d-button>
    </div>
  </d-dialog>
</template>

<script type="text/ecmascript-6">
  import { Schema } from '../../src/index.js'

  var querySchema = new Schema({
    userName: {
      label: 'UserName'
    },
    email: {
      label: 'Email'
    },
    phone: {
      label: 'Phone'
    }
  });

  var userSchema = new Schema({
    userName: {
      label: 'UserName',
      whitespace: false,
      required: true
    },

    sex: {
      default: 0,
      label: 'Sex',
      mapping: {
        'Male': 1,
        'Female': 0
      },
      trueValue: 1,
      falseValue: 0
    },

    email: {
      label: 'Email',
      required: true
    },

    phone: {
      label: 'Phone',
      required: true
    },

    comment: {
      label: 'Comment'
    }
  });

  export default {
    methods: {
      confirmEditingUser() {
        if (this.editUser.validate()) {
          this.editDialogVisible = false;
          Object.assign(this.editingUser, this.editUser);
        }
      },

      confirmAddUser() {
        if (this.newUser.validate()) {
          this.addDialogVisible = false;
          this.users.push(Object.assign({} ,this.newUser));
          this.newUser.reset();
        }
      },

      cancelAddUser() {
        this.addDialogVisible = false;
        this.newUser.reset();
      }
    },

    events: {
      addUser() {
        this.addDialogVisible = true;
      },

      editUser(row) {
        this.editDialogVisible = true;
        this.editingUser = row;
        this.editUser.assign(row);
      }
    },

    ready() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/examples/data/users.json', true);
      xhr.onload = (response) => {
        this.users = JSON.parse(response.target.responseText);
      };
      xhr.send();
    },

    data() {
      return {
        addDialogVisible: false,
        editDialogVisible: false,
        userSchema: userSchema,
        newUser: userSchema.newModel(),
        editUser: userSchema.newModel(),
        editingUser: null,
        users: [],
        querySchema: querySchema,
        queryCondition: querySchema.newModel()
      };
    }
  };
</script>