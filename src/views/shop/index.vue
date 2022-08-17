<template>
  <div class="content">
    <GoodList :goods="data.goods" :ref="bindRef" />
  </div>
  <div class="bottom"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from "vue";
import GoodList from "./components/GoodList.vue";
import data from "@/utils/goods";

export default defineComponent({
  name: "ABOUT",
  components: {
    GoodList
  },
  setup() {
    let refs: unknown;
    const bindRef = (el: unknown) => {
      refs = el;
    };
    onMounted(() => {
      console.log(123, refs);
    });
    return {
      bindRef,
      data
    };
  }
});
</script>
<style lang="less" scoped>
.content {
  position: absolute;
  top: 0;
  bottom: 64px;
  width: 100%;
  overflow: auto;
}
.bottom {
  background: #5b8ff9;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 64px;
}
</style>
