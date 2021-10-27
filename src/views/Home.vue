<template>
  <div class="home">
    <div class="page_header">
      <span class="page_title">首页</span>
      <div class="page_search">
        <input type="text" placeholder="点点看看吧😄..." />
      </div>
    </div>
    <div class="header_menu">
      <div class="menu_item" @click="toDetail('/message')">
        <div>
          <van-icon name="wechat" size="40" color="#52c41a" />
        </div>
        <span>朋友圈</span>
      </div>
      <div class="menu_item" @click="toDetail('/shop')">
        <div>
          <van-icon name="cart-circle" size="40" color="#13c2c2" />
        </div>
        <span>购物车</span>
      </div>
      <div class="menu_item" @click="toDetail('/vuex')">
        <div>
          <van-icon name="fire" size="40" color="#ee0a24" />
        </div>
        <span>Vuex</span>
      </div>
      <div class="menu_item" @click="toDetail('/message')">
        <div>
          <van-icon name="umbrella-circle" size="40" color="#2f54eb" />
        </div>
        <span>广场</span>
      </div>
    </div>
    <div class="hot_rank">
      <div class="title">猜你喜欢~</div>
      <div>
        <van-swipe class="projects" :loop="false" :width="300">
          <van-swipe-item>
            <img :src="require('@/assets/images/banner1.jpg')" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="require('@/assets/images/banner2.jpg')" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="require('@/assets/images/banner3.jpg')" alt="" />
          </van-swipe-item>
          <van-swipe-item>
            <img :src="require('@/assets/images/banner4.jpg')" alt="" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <div class="hot_topic">
      <van-tabs
        v-model:active="activeTopic"
        sticky
        class="topic_tab"
        color="#85a5ff"
      >
        <van-tab title="发现">
          <div class="topic_box">
            发现模块正在开发😄
          </div>
        </van-tab>
        <van-tab title="关注">
          <div class="topic_box">
            关注模块正在开发😄
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <!-- <div class="user-head">
      <div class="user-avatar">
        <img src="@assets/images/vue3.png" alt="" />
      </div>
      <div class="user-info">
        <div class="name">{{ user.name }}</div>
        <div class="hello">vue3.0 ts h5 with vant</div>
      </div>
      <div class="message">
        <div class="message-box" @click="toMessage">
          <van-icon
            name="smile-comment-o"
            size="30"
            badge="9"
            color="#4fc08d"
          />
        </div>
      </div>
    </div>
  
    <div class="menu">
      <div class="list">
        <div
          class="item"
          v-for="item in menus"
          :key="item.title"
          @click="toDetail(item.path)"
        >
          <div>
            <van-icon :name="item.icon" size="30" color="#4fc08d" />
          </div>
          <div class="intro">
            <div class="title">{{ item.title }}</div>
            <div class="sub-title" v-html="item.sub"></div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, inject, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "HOME",

  setup() {
    const router = useRouter();
    const state = reactive({
      user: {}
    });
    const planList = inject("planList");
    console.log(planList);
    const activeTopic = ref(0);

    const menus = [
      {
        title: "WeChat朋友圈 ",
        path: "/message",
        icon: "friends-o",
        sub: "🌴 Vue3模仿微信朋友圈，点击查看！欢迎留言 "
      },
      {
        title: "Shoping购物车 ",
        path: "/shop",
        icon: "cart-o",
        sub: "🛒 Vue3购物车项目开始启动，尽请期待！ "
      },
      {
        title: "Vuex",
        path: "/vuex",
        icon: "cluster-o",
        sub:
          "📦 Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式! <br>点击我查看Vue3.0中Vuex的操作吧"
      },
      {
        title: "Composition Api",
        path: "/vuex",
        icon: "hot-o",
        sub:
          "👄 下一个主要版本的Vue中讨论的最常见的就是Composition AP的特色语法的。 这是一种全新的逻辑重用和代码组织方法"
      }
    ];
    const store = useStore();
    state.user = store.state.user;
    const toDetail = (path: string) => {
      router.push(path);
    };
    const toMessage = () => {
      router.push("/message");
    };
    return {
      ...toRefs(state),
      menus,
      toDetail,
      toMessage,
      activeTopic
    };
  }
});
</script>
<style lang="less" scoped>
@import "@/theme/hairline";
.home {
  height: 100%;
  padding: 0 12px;
  .page_header {
    padding: 12px 0;
    display: flex;
    align-items: center;
    .page_title {
      width: 50px;
      font-size: 18px;
      font-weight: bold;
    }
    .page_search {
      flex: 1;
      border-radius: 4px;
      input {
        width: 100%;
        border: none;
        background: #f5f5f5;
        padding: 6px;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
  }
  .header_menu {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    .menu_item {
      text-align: center;
      span {
        font-size: 14px;
        display: inline-block;
        margin-top: 6px;
      }
    }
  }
  .hot_rank {
    margin-top: 16px;
    .title {
      font-size: 17px;
      font-weight: bold;
    }
    .projects {
      margin-top: 12px;
      :deep(.van-swipe-item) {
        border: 1px solid #eeeeee;
        font-size: 20px;
        text-align: center;
        img {
          width: 100%;
          height: 152px;
        }
        // background-color: #39a9ed !important;
      }
    }
  }
  .topic_tab {
    :deep(.van-tabs__nav--line.van-tabs__nav--complete) {
      padding-left: 0 !important;
    }
    :deep(.van-tabs__wrap--scrollable .van-tab) {
      padding: 0;
      margin-right: 12px;
    }
    :deep(.van-tab.van-tab--active) {
      font-weight: bold;
      font-size: 16px;
    }
    :deep(.van-tab) {
      flex: none;
    }
    .topic_box {
      padding: 12px 0;
    }
  }

  // .user-head {
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 0 24px 0 16px;

  //   .user-avatar {
  //     width: 60px;
  //     & > img {
  //       margin-top: 6px;
  //       width: 60px;
  //       height: 60px;
  //       border-radius: 20px;
  //     }
  //   }
  //   .user-info {
  //     flex: 1;
  //     padding: 12px;
  //     .hello {
  //       color: #bfbfbf;
  //       margin-top: 8px;
  //     }
  //     .name {
  //       font-size: 24px;
  //     }
  //   }
  //   .message {
  //     width: 50px;
  //     display: flex;
  //     align-items: center;
  //     .message-box {
  //       height: 50px;
  //       width: 50px;
  //       display: flex;
  //       align-items: center;
  //       border-radius: 10px;
  //       text-align: center;
  //       justify-content: center;
  //       // box-shadow: 1px 4px 25px rgba($color: #000000, $alpha: 0.15);
  //     }
  //   }
  // }
  // .divider-line {
  //   width: 100%;
  //   height: 12px;
  //   background: #f0f0f0;
  // }
  // .menu {
  //   .list {
  //     padding: 10px 20px;
  //     box-sizing: border-box;
  //     width: 100%;
  //     overflow: hidden;

  //     .item {
  //       display: flex;
  //       padding: 12px 0;
  //       position: relative;
  //       width: 100%;
  //       min-height: 40px;
  //       .menu-img {
  //         background: #bae7ff;
  //         border-radius: 30%;
  //         width: 30px;
  //         height: 30px;
  //       }
  //       .intro {
  //         flex: 1;
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: space-between;
  //         padding-left: 12px;
  //         .title {
  //           font-size: 18px;
  //           font-weight: 500;
  //           vertical-align: text-top;
  //         }
  //         .sub-title {
  //           color: #969799;
  //           width: 92%;
  //           font-size: 14px;
  //           margin-top: 6px;
  //           line-height: 1.3;
  //         }
  //       }
  //     }
  //     .item + .item {
  //       &::after {
  //         .hairline-top(@border-color);
  //       }
  //     }
  //   }
  // }
}
</style>
