<template>
  <div class="app-container">
    123
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const state = reactive({
      active: 0,
      user: {}
    });
    const store = useStore();
    state.user = store.state.user;
    return {
      ...toRefs(state)
    };
  }
});
</script>
<style lang="scss">
@import "@assets/style/mixin.scss";
</style>
