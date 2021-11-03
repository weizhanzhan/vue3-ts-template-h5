<template>
  <div class="home">
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive :include="includeRoutes">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <div class="bottom-bar">
      <van-tabbar v-model="active" active-color="#85a5ff">
        <van-tabbar-item name="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item name="/about" icon="award">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "LAYOUT",
  setup() {
    const router = useRouter();
    const state = reactive({
      active: "/home",
      includeRoutes: ["ABOUT"]
    });
    watch(
      () => state.active,
      val => {
        router.push(val);
      }
    );

    onMounted(() => {
      state.active = router.currentRoute.value.path;
    });
    return {
      ...toRefs(state)
    };
  }
});
</script>
<style lang="less" scoped>
// @import "@assets/style/mixin.scss";
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
  .bottom-bar {
    height: 50px;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
