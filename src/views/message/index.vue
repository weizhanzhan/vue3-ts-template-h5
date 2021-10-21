<template>
  <app-container :appbar="false">
    <div class="header">
      <img src="@assets/images/message_bg.gif" alt="" srcset="" />
      <div class="action fl" @click="toBack">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="action fr" @click="toSendMessage">
        <i class="iconfont iconcamera" style="font-size:20px"></i>
      </div>
      <div class="info">
        <div class="info-box">
          <img src="@assets/images/avatar.jpg" alt="" srcset="" />
          <div class="name">Zhanwei</div>
        </div>
      </div>
    </div>
    <div class="messages">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in messages" :key="item.objectId" class="message-item">
          <div class="message-item-box">
            <div class="user">
              <div :id="item.objectId" class="identicon">
                {{ setAvatar(item.objectId) }}
              </div>
            </div>
            <div class="msg-container">
              <div class="name">{{ item.name }}</div>
              <div class="content">
                <div class="texts">{{ item.content }}</div>
                <div class="imgs" v-if="item.files && item.files.length">
                  <template v-for="img in item.files">
                    <img :key="img" v-if="img" :src="img" alt="" srcset="" />
                  </template>
                </div>
              </div>
              <div class="desc">
                <div>
                  {{
                    item.name === "weizhanzhan"
                      ? "最新"
                      : getBeforeNowCount(item.createdAt)
                  }}
                </div>
                <!-- 弹出层 操作 点赞 评论 -->
                <div>
                  <van-popover v-model:show="item.state" placement="left">
                    <div class="popover-action">
                      <div class="star" @click="toStar">
                        <van-icon name="like-o" />&nbsp;赞
                      </div>
                      <div class="line">|</div>
                      <div class="comment" @click="toComment">
                        <van-icon
                          name="smile-comment-o"
                          size="16px"
                        />&nbsp;评论
                      </div>
                    </div>
                    <template #reference>
                      <div class="support">
                        <span>·&nbsp;·</span>
                      </div>
                    </template>
                  </van-popover>
                </div>
              </div>
              <div class="stars">
                <span class="star-icon"
                  ><van-icon name="like-o" size="12"
                /></span>
                <div class="star-item">
                  weizhanzhan
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </app-container>
</template>
<script lang="ts">
import { MessageStateOPtion, BmobMessage } from "@/entities/bmob";
import { getBeforeNowCount, getRandomAvatar } from "@/utils/utils";
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MESSAGE",
  setup() {
    const router = useRouter();
    const stateObj: MessageStateOPtion = {
      messages: [],
      input: "",
      loading: false,
      finished: false
    };
    const state = reactive(stateObj);

    const form = new BmobMessage(
      reactive({ name: "", content: "", files: [], state: false })
    );

    const toBack = () => {
      router.back();
    };
    const onLoad = async () => {
      try {
        form.page++;
        const messages = await form.findAll();
        state.loading = false;
        if (messages.length < form.size) {
          state.finished = true;
        }
        state.messages.push(...messages);
      } catch (error) {
        state.finished = true;
      }
    };
    const getMessages = async () => {
      const messages = await form.findAll();
      state.messages = messages;
    };

    // 留言
    const toSendMessage = () => {
      router.push("/form");
    };
    // 头像
    const setAvatar = (id: string) => {
      const dom = document.getElementById(id);
      dom && getRandomAvatar(dom);
    };
    const toStar = () => {
      console.log("点赞");
    };
    const toComment = () => {
      console.log("评论");
    };
    onMounted(() => {
      getMessages();
    });
    return {
      ...toRefs(state),
      toBack,
      toSendMessage,
      form,
      getBeforeNowCount,
      onLoad,
      setAvatar,
      toStar,
      toComment
    };
  }
});
</script>
<style lang="less" scoped>
@import "@/theme/hairline";
.header {
  position: relative;
  padding-bottom: 50px;
  .action {
    position: absolute;
    color: #ffffff;
    top: 12px;
    &.fl {
      left: 12px;
    }
    &.fr {
      right: 12px;
    }
  }
  img {
    width: 100%;
  }
  .info {
    position: absolute;
    width: 100%;
    height: 80px;
    bottom: 0;
    z-index: 1;
    .info-box {
      position: relative;
      width: 100%;
      height: 100%;
      img {
        position: absolute;
        height: 70px;
        width: 70px;
        right: 12px;
        bottom: 30px;
        border-radius: 10px;
      }
      .name {
        position: absolute;
        right: 92px;
        bottom: 60px;
        color: #ffffff;
        font-weight: bold;
      }
    }
  }
}
.messages {
  .message-item {
    width: 100%;
    position: relative;
    box-sizing: border-box;
    padding: 12px 16px;
    word-break: break-word;
    .message-item-box {
      display: flex;
      .user {
        flex: 0 0 40px;

        img {
          height: 35px;
          width: 35px;
          border-radius: 6px;
        }
      }
      .msg-container {
        flex: 1;
        padding-left: 4px;
        .name {
          color: #003a8c;
        }
        .content {
          padding: 10px 0;
          .texts {
            line-height: 1.4;
          }
          .imgs {
            padding-top: 14px;
            img {
              margin-right: 4px;
              margin-top: 2px;
              width: 80px;
              height: 80px;
            }
          }
        }
        .desc {
          color: #bfbfbf;
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          .support {
            background: #f5f5f5;
            color: #003a8c;
            padding: 0 6px;
            font-weight: 700;
          }
          .popover {
            background: #000000;
            color: #ffffff;
          }
        }
        .stars {
          background: #f5f5f5;
          color: #003a8c;
          margin-top: 12px;
          border-radius: 2px;
          padding: 4px 8px;
          display: flex;
          .star-icon {
            margin-right: 8px;
          }
        }
      }
    }
  }
  .message-item + .message-item {
    &::after {
      .hairline-top(@border-color);
    }
  }
}
</style>
