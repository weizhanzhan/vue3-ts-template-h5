<template>
  <app-container :appbar="false">
    <div class="header">
      <img src="@assets/images/message_bg.gif" alt="" srcset="" />
      <div class="action fl" @click="toBack">
        <van-icon name="arrow-left" size="20" />
      </div>
      <div class="action fr" @click="sheetShow = true">
        <van-icon name="comment-circle-o" size="20" />
      </div>
    </div>
    <div>
      <p v-for="item in messages" :key="item.objectId">
        <van-cell
          :title="item.name"
          :value="item.createdAt"
          :label="item.content"
        />
      </p>
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
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const stateObj: { messages: BmobMessageOption[]; sheetShow: boolean } = {
      messages: [],
      sheetShow: false
    };
    const state = reactive(stateObj);

    const form = new BmobMessage(reactive({ name: "", content: "" }));

    const toBack = () => {
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
.header {
  position: relative;
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
}
</style>
