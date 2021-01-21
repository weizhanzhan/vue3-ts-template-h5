<template>
  <div class="menu">
    <div class="wrapper">
      <ul class="content">
        <li class="good-item" v-for="item in goods" :key="item.name">
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import BScroll from "better-scroll";

import { defineComponent, reactive, onMounted } from "vue";

export default defineComponent({
  props: ["good"],
  setup(props) {
    let bscroll = reactive({});
    onMounted(() => {
      bscroll = new BScroll(".wrapper", {
        movable: true
      });
    });
    return {
      bscroll,
      goods: props.good
    };
  }
});
</script>

<style scoped lang="scss">
.menu {
  .wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .good-item {
      padding: 10px;
      background: #eeeeee;
    }
  }
}
</style>
