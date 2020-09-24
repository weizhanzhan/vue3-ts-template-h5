<template>
  <div class="home">
    <div class="content">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <div class="bottom-bar">
      <van-tabbar v-model="active">
        <van-tabbar-item name="/home" icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item name="/about" icon="smile-o">About</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      active: "/home",
      user: {}
    });
    watch(
      () => state.active,
      val => {
        router.push(val);
      }
    );
    const menus = [
      {
        title: "VUEX",
        path: "/vuex",
        sub:
          " Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式! <br>😄点击我查看Vue3.0中Vuex的操作吧"
      },
      {
        title: "Composition Api",
        path: "/vuex",
        sub:
          " 下一个主要版本的Vue中讨论的最常见的就是Composition AP的特色语法的。 这是一种全新的逻辑重用和代码组织方法"
      }
    ];
    const store = useStore();
    state.user = store.state.user;
    const toDetail = (path: string) => {
      console.log(router);
      router.push(path);
    };
    return {
      ...toRefs(state),
      menus,
      toDetail
    };
  }
});
</script>
<style lang="scss" scoped>
@import "@assets/style/mixin.scss";
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
