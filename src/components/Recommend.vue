<template>
  <div class="recommend" @click="toDetail">
    <div class="logo">
      <img :src="data.logo" alt="" />
    </div>
    <div class="info">
      <div class="title">
        {{ data.title }}
      </div>
      <div class="desc">
        {{ data.desc }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ResourceOption } from "@/entities/resource";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<ResourceOption>
    }
  },
  setup(props) {
    const toDetail = () => {
      props.data && window.open(props.data.url);
    };
    return {
      toDetail
    };
  }
});
</script>

<style lang="less" scoped>
@import "@/theme/hairline";
.recommend {
  position: relative;
  padding: 12px 6px;

  display: flex;
  .logo {
    width: 30px;
    padding-top: 4px;
    img {
      width: 100%;
    }
  }
  .info {
    flex: 1;
    padding-left: 12px;
  }
  .title {
    font-weight: 500;
  }
  .desc {
    margin-top: 8px;
    font-size: 14px;
    color: rgba(13, 27, 62, 0.65);
  }
}
.recommend + .recommend {
  margin-top: 12px;
  &::after {
    .hairline-bottom(@border-color);
  }
}
</style>
