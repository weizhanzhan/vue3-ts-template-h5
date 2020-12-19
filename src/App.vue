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
      includeRoutes: ["ABOUT"]
    });
    return { ...toRefs(state) };
  }
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
