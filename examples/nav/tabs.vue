<template>
  <d-tabs v-ref:tabs>
    <d-tab title="one" closable>
      Tab1
      <d-button @click="changeTab()">Change Tab</d-button>
    </d-tab>
    <d-tab title="two" icon="fa fa-firefox" closable>
      Tab2
      <div>
        Test2
      </div>
    </d-tab>
    <d-tab title="three" disabled>
      Tab3
      <div>
        Test3
      </div>
      <div>
        Test4
      </div>
    </d-tab>
  </d-tabs>

  <d-tabs tab-placement="bottom">
    <d-tab title="one" closable>
      Tab1
    </d-tab>
    <d-tab title="two" icon="fa fa-firefox" closable>
      Tab2
      <div>
        Test2
      </div>
    </d-tab>
    <d-tab title="three" disabled>
      Tab3
      <div>
        Test3
      </div>
      <div>
        Test4
      </div>
    </d-tab>
  </d-tabs>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    methods: {
      changeTab() {
        this.$refs.tabs.setActiveTab(1);
      }
    }
  }
</script>