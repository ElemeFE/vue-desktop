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

    <d-tab v-for="i in 2" :title="i.toString()" closable>
      Tab{{ i }}
    </d-tab>

    <d-tab title="4" closable>
      Tab4
    </d-tab>

    <d-tab title="5" closable>
      Tab5
    </d-tab>

    <d-tab title="6" closable>
      Tab6
    </d-tab>

    <d-tab title="7" closable>
      Tab7
    </d-tab>

    <d-tab title="8" closable>
      Tab8
    </d-tab>

    <d-tab title="9" closable>
      Tab9
    </d-tab>

    <d-tab title="10" closable>
      Tab10
    </d-tab>

    <d-tab title="11" closable>
      Tab11
    </d-tab>

    <d-tab title="12" closable>
      Tab12
    </d-tab>

    <d-tab title="13" closable>
      Tab13
    </d-tab>

    <d-tab title="14" closable>
      Tab14
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

<script type="text/ecmascript-6">
  export default {
    methods: {
      changeTab() {
        this.$refs.tabs.setActiveTab(1);
      }
    }
  };
</script>