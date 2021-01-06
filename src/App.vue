<template>
  <router-view v-slot="{ Component }">
    <!-- <keep-alive> -->
    <component :is="Component" />
    <!-- </keep-alive> -->
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
