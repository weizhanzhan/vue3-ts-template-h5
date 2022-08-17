<template>
  <div class="good-list" :ref="bindContainertDom">
    <div class="action-bar">
      <div class="action">
        <van-icon
          name="arrow-left"
          size="20"
          @click="toBack"
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
    <div class="header"></div>
    <div class="content" :ref="bindContentDom">
      <p v-for="n in 20" :key="n">这是内容</p>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, onMounted, ref } from "vue";
import GoodLeft from "./GoodLeft.vue";
import GoodRight from "./GoodRight.vue";
const INIT_HEIGHT = 200;
const MAX_TOP_SCROLL = 150;
export default defineComponent({
  props: ["goods"],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    GoodLeft,
    // eslint-disable-next-line vue/no-unused-components
    GoodRight
  },
  setup(props) {
    const router = useRouter();
    let containerDom: HTMLElement | null = null;

    let contentElement: HTMLElement | null = null;

    const headerHeightAndContentTop = ref(INIT_HEIGHT);
    const bindContainertDom = (el: HTMLElement) => (containerDom = el);
    const bindContentDom = (el: HTMLElement) => (contentElement = el);
    const scroll = function() {
      const top = containerDom?.scrollTop || 0;
      // const mintop =
      //   INIT_HEIGHT - (top > MAX_TOP_SCROLL ? MAX_TOP_SCROLL : top);
      // headerHeightAndContentTop.value = mintop;
      if (top > MAX_TOP_SCROLL && contentElement) {
        contentElement.style.position = "absolute";
        contentElement.style.top = INIT_HEIGHT - MAX_TOP_SCROLL + "px";

        // containerDom.style.overflow = "hidden";
      }
    };

    onMounted(() => {
      // contentElement && (contentElement.onscroll = scroll);
      containerDom && (containerDom.onscroll = scroll);
    });
    const toBack = () => {
      router.back();
    };

    return {
      toBack,
      good: props.goods,
      bindContentDom,
      bindContainertDom,
      headerHeightAndContentTop
    };
  }
});
</script>

<style scoped lang="less">
.good-list {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: auto;
  .action-bar {
    position: fixed;
    z-index: 1;
    top: 0;
    width: 100%;
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
  .header {
    position: relative;
    width: 100%;
    height: 200px;
    font-size: 10vmin;
    // background: url("../../../assets/images/shop-banner.jpg") no-repeat;
    // background-size: 100%;
    background: #78d3f8;
  }
  .content {
    position: relative;
    width: 100%;
    overflow: hidden;
    p {
      padding: 12px;
      border-bottom: 1px solid gray;
    }
  }
}
</style>
