<template>
  <div class="menu">
    <div class="wrapper" id="wrapper" ref="test">
      <ul class="content">
        <li class="good-item" v-for="item in goods" :key="item.name">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import BScroll from "@better-scroll/core";

import { defineComponent, reactive, onMounted } from "vue";

export default defineComponent({
  props: ["good"],
  setup(props) {
    let bscroll = reactive({});
    onMounted(() => {
      const wrapper = document.getElementById("wrapper") as HTMLElement;

      bscroll = new BScroll(wrapper, {
        // movable: true
        probeType: 3,
        click: true
      });
    });
    return {
      bscroll,
      goods: props.good
    };
  }
});
</script>

<style scoped lang="less">
.menu {
  .wrapper {
    position: relative;
    overflow: hidden;
    .good-item {
      padding: 10px;
      height: 40px;
      background: #ced4de;
    }
  }
}
</style>
