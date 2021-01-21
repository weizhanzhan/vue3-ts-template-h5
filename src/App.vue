<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent, provide } from "vue";
import provideStore from "./utils/provideStore";
export default defineComponent({
  setup() {
    provide("planList", provideStore.planList);
    let i = 0;
    setInterval(() => {
      i++;
      provideStore.planList.value.push(i);
    }, 1000);
  }
});
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
</style>
