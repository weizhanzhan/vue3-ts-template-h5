<template>
  <div class="home">
    <div class="content">
      <div class="user-head">
        <div class="user-avatar">
          <img src="@assets/images/avatar.jpg" alt="" />
        </div>
        <div class="user-info">
          <div class="hello">Good morning!</div>
          <div class="name">Marin Ramsey</div>
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
    </div>
    <div class="bottom-bar">
      <van-tabbar v-model="state.active">
        <van-tabbar-item icon="home-o">Home</van-tabbar-item>
        <van-tabbar-item icon="search">Find</van-tabbar-item>
        <van-tabbar-item icon="friends-o">Message</van-tabbar-item>
        <van-tabbar-item icon="setting-o">Setting</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      active: 0
    });
    return {
      state
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
      @include all-border-1px(#eeeeee, 0);

      .user-avatar {
        width: 80px;
        & > img {
          width: 80px;
          height: 80px;
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
          font-weight: bold;
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
  }
}
</style>
