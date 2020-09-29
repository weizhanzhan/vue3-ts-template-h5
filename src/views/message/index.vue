<template>
  <app-container :appbar="false">
    <div class="header">
      <img src="@assets/images/message_bg.gif" alt="" srcset="" />
      <div class="action fl" @click="toBack">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="action fr" @click="sheetShow = true">
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
      <div v-for="item in messages" :key="item.objectId" class="message-item">
        <div class="message-item-box">
          <div class="user">
            <img src="@assets/images/avatar.jpg" alt="" />
          </div>
          <div class="msg-container">
            <div class="name">{{ item.name }}</div>
            <div class="content">
              {{ item.content }}
            </div>
            <div class="date">
              {{ item.createdAt }}
            </div>
          </div>
        </div>
        <!-- <van-cell
          :title="item.name"
          :value="item.createdAt"
          :label="item.content"
        /> -->
      </div>
    </div>

    <van-action-sheet v-model:show="sheetShow" title="Message">
      <div class="content">
        <van-field
          v-model="form.content.name"
          label="username"
          placeholder="username/email/mobile"
        />
        <van-field
          v-model="form.content.content"
          rows="2"
          autosize
          label="message"
          type="textarea"
          maxlength="50"
          placeholder="please enter ..."
          show-word-limit
        />
        <van-button type="primary" block @click="submit">Submit</van-button>
      </div>
    </van-action-sheet>
  </app-container>
</template>
<script lang="ts">
import { BmobMessageOption, BmobMessage } from "@/entities/bmob";
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  toRefs
} from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const instance = getCurrentInstance();

    const router = useRouter();
    const stateObj: {
      messages: BmobMessageOption[];
      sheetShow: boolean;
      input: string;
    } = {
      messages: [],
      sheetShow: false,
      input: ""
    };
    const state = reactive(stateObj);

    const form = new BmobMessage(reactive({ name: "", content: "" }));

    const toBack = () => {
      console.log(instance);
      router.back();
    };
    const getMessages = async () => {
      const messages = await BmobMessage.findAll();
      state.messages = messages;
    };
    const submit = () => {
      form.create().then(() => {
        state.sheetShow = false;
        getMessages();
      });
    };

    onMounted(() => {
      getMessages();
    });
    return {
      ...toRefs(state),
      toBack,

      form,
      submit
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
        }
        .date {
          color: #bfbfbf;
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
