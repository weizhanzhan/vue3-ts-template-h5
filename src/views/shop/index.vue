<template>
  <GoodList :goods="data.goods" />
  <div class="bottom">
    我是购物车
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import GoodList from "./components/GoodList.vue";
import data from "@/utils/goods";

export default defineComponent({
  name: "ABOUT",
  components: {
    GoodList
  },
  setup() {
    return {
      data
    };
  }
});
</script>
<style lang="less" scoped>
.bottom {
  position: absolute;
  bottom: 0;
  height: 64px;
}
</style>
