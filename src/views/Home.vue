<template>
  <div class="home">
    <div class="content">
      <div class="user-head">
        <div class="user-avatar">
          <img src="@assets/images/avatar.jpg" alt="" />
        </div>
        <div class="user-info">
          <div class="hello">Good morning!</div>
          <div class="name">{{ user.name }}</div>
        </div>
        <div class="message">
          <div class="message-box">
            <van-icon
              name="smile-comment-o"
              size="30"
              badge="9"
              color="#1989fa"
            />
          </div>
        </div>
      </div>
      <div class="divider-line"></div>
      <div class="menu">
        <div class="list">
          <div
            class="item"
            v-for="item in menus"
            :key="item.title"
            @click="toDetail(item.path)"
          >
            <div>
              <img
                class="menu-img"
                src="@assets/images/vue.png"
                alt=""
                srcset=""
              />
            </div>
            <div class="intro">
              <div class="title">{{ item.title }}</div>
              <div class="sub-title" v-html="item.sub"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-bar">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item icon="search">Find</van-tabbar-item>
        <van-tabbar-item icon="friends-o">Message</van-tabbar-item>
        <van-tabbar-item icon="setting-o">Setting</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  setup() {
    const router = useRouter();
    const state = reactive({
      active: 0,
      user: {}
    });
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
<style lang="scss">
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
    .user-head {
      display: flex;
      justify-content: space-between;
      padding: 0 24px 0 16px;

      .user-avatar {
        width: 60px;
        & > img {
          margin-top: 6px;
          width: 60px;
          height: 60px;
          border-radius: 20px;
        }
      }
      .user-info {
        flex: 1;
        padding: 12px;
        .hello {
          color: #bfbfbf;
        }
        .name {
          margin-top: 8px;
          font-size: 24px;
        }
      }
      .message {
        width: 50px;
        display: flex;
        align-items: center;
        .message-box {
          height: 50px;
          width: 50px;
          display: flex;
          align-items: center;
          border-radius: 10px;
          text-align: center;
          justify-content: center;
          box-shadow: 1px 4px 25px rgba($color: #000000, $alpha: 0.15);
        }
      }
    }
    .divider-line {
      width: 100%;
      height: 12px;
      background: #f0f0f0;
    }
    .menu {
      .list {
        padding: 10px 20px;
        box-sizing: border-box;
        width: 100%;
        overflow: hidden;

        .item {
          display: flex;
          padding: 12px 0;
          width: 100%;
          min-height: 40px;
          .menu-img {
            background: #bae7ff;
            border-radius: 30%;
            width: 30px;
            height: 30px;
          }
          .intro {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-left: 12px;
            .title {
              font-size: 18px;
              font-weight: 500;
              vertical-align: text-top;
            }
            .sub-title {
              color: #969799;
              width: 92%;
              font-size: 14px;
              margin-top: 6px;
              line-height: 1.3;
            }
          }
        }
        .item + .item {
          @include border-1px(#eeeeee, top);
        }
      }
    }
  }
}
</style>
