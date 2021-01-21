<template>
  <app-container title="Vue3 购物车">
    开发中...
  </app-container>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ABOUT",
  setup() {
    return {};
  },
  activated() {
    console.log("我被缓存了");
  }
});
</script>
<style lang="less" scoped></style>
