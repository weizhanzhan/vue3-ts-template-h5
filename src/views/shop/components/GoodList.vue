<template>
  <div class="good-list">
    <GoodLeft class="left" :good="good" />
    <GoodRight class="right" :good="good" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GoodLeft from "./GoodLeft.vue";
import GoodRight from "./GoodRight.vue";
export default defineComponent({
  props: ["goods"],
  components: {
    GoodLeft,
    GoodRight
  },
  setup(props) {
    console.log(props.goods);
    return {
      good: props.goods
    };
  }
});
</script>

<style scoped lang="scss">
.good-list {
  position: absolute;
  top: 0;
  bottom: 64px;
  width: 100%;
  display: flex;
  .left {
    flex: 0 0 100px;
    height: 100%;
  }
  .right {
    flex: 1;
  }
}
</style>
