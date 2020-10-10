<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="includeRoutes">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      includeRoutes: ["/about", "about"]
    });
    return { ...toRefs(state) };
  }
});
</script>

<style lang="scss">
@import url("https://fonts.font.im/css?family=PT+Sans");
* {
  padding: 0;
  margin: 0;
}
body {
  font-family: "PT Sans", sans-serif !important;
}
</style>
