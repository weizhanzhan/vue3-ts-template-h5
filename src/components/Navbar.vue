<template>
  <div class="navbar wx-flex wx-flex-sb">
    <div class="left" @click="back">取消</div>
    <div class="center">发表文字</div>
    <div class="action" :class="{ active: submitPermission }" @click="submit">
      发表
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    submitPermission: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    function submit() {
      props.submitPermission && ctx.emit("submit");
    }
    function back() {
      ctx.emit("back");
    }
    return {
      submit,
      back
    };
  }
});
</script>

<style lang="less" scoped>
.navbar {
  padding: 12px;
  .left {
    padding: 10px 0;
    width: 36px;
  }
  .center {
    font-weight: bold;
    padding: 10px;
  }
  .action {
    background: @gray-3;
    color: @gray-6;
    padding: 10px 12px;
    border-radius: 5px;
    &.active {
      background: @green;
      color: @white;
    }
  }
}
</style>
