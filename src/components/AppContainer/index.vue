<template>
  <div class="container">
    <div class="appbar" v-if="appbar">
      <van-nav-bar
        :title="title"
        left-text="返回"
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "AppContainer",
  props: {
    appbar: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    back: {
      type: String,
      default: ""
    }
  },
  setup(prop, ctx) {
    const router = useRouter();
    const onClickLeft = () => {
      router.back();
      ctx.emit("click-left");
    };
    const onClickRight = () => {
      ctx.emit("click-right");
    };
    return {
      onClickLeft,
      onClickRight
    };
  }
});
</script>
<style lang="less">
// @import "@assets/style/mixin.scss";
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .appbar {
    @include border-1px(#eeeeee, bottom);
    height: 47px;
    box-shadow: 1px 2px 3px #eeeeee;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
