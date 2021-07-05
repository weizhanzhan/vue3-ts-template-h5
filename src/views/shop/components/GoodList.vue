<template>
  <div class="good-list">
    <div class="header" :style="{ height: headerHeightAndContentTop + 'px' }">
      <div class="action">
        <van-icon
          name="arrow-left"
          size="20"
          class="action-left"
          color="#ffffff"
        />
        <van-icon
          name="ellipsis"
          size="20"
          class="action-right"
          color="#ffffff"
        />
        <van-icon
          name="like-o"
          size="20"
          class="action-right"
          color="#ffffff"
        />
        <van-icon
          name="search"
          size="20"
          class="action-right"
          color="#ffffff"
        />
        <div class="clear"></div>
      </div>
    </div>
    <div
      class="content"
      :ref="bindDom"
      :style="{ top: headerHeightAndContentTop + 'px' }"
    >
      <p v-for="n in 20" :key="n">这是内容</p>
      <!-- <div class="left">
        <GoodLeft :good="good" />
      </div>
      <div class="right">
        <GoodRight :good="good" />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import GoodLeft from "./GoodLeft.vue";
import GoodRight from "./GoodRight.vue";
const INIT_HEIGHT = 200;
export default defineComponent({
  props: ["goods"],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    GoodLeft,
    // eslint-disable-next-line vue/no-unused-components
    GoodRight
  },
  setup(props) {
    let contentElement: HTMLElement | null = null;
    const headerHeightAndContentTop = ref(INIT_HEIGHT);
    const bindDom = (el: HTMLElement) => (contentElement = el);

    const scroll = function() {
      const top = contentElement?.scrollTop || 0;
      const mintop = INIT_HEIGHT - (top > 150 ? 150 : top);
      headerHeightAndContentTop.value = mintop;

      console.log("出发？");
    };

    onMounted(() => {
      contentElement && (contentElement.onscroll = scroll);
    });

    return {
      good: props.goods,
      bindDom,
      headerHeightAndContentTop
    };
  }
});
</script>

<style scoped lang="scss">
.good-list {
  position: relative;
  height: 100%;
  width: 100%;
  .header {
    position: absolute;
    width: 100%;
    font-size: 10vmin;
    top: 0;
    background: url("../../../assets/images/shop-banner.jpg") no-repeat;
    background-size: 100%;
    .action {
      padding: 12px;
      .action-left {
        float: left;
      }
      .action-right {
        float: right;
        & + .action-right {
          margin-right: 12px;
        }
      }
      .clear {
        clear: both;
      }
    }
  }
  .content {
    position: absolute;
    width: 100%;
    bottom: 0px;
    overflow: auto;
    p {
      padding: 12px;
      border-bottom: 1px solid gray;
    }
  }
}
</style>
