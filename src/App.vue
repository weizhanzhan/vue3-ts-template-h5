<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Helvetica Neue",
    Helvetica, Segoe UI, Arial, Roboto, "PingFang SC", "miui",
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif !important;
}
</style>
