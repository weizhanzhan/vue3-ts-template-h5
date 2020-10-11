<template>
  <div class="form">
    <wx-bar
      :submit-permission="!!message.length"
      @submit="submit"
      @back="toback"
    />
    <div>
      <van-field
        v-model="message"
        rows="2"
        autosize
        label=""
        type="textarea"
        placeholder="这一刻的想法..."
      />
    </div>
    <div class="upload">
      <van-uploader
        :before-read="beforeRead"
        :max-size="500 * 1024"
        @oversize="onOversize"
        v-model.fileList="fileList"
        multiple
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import WxBar from "@/components/Navbar.vue";
import { useRandomName } from "@/utils/utils";
import { Toast } from "vant";
import { BmobMessage } from "@/entities/bmob";
import router from "@/router";
const ImageTypes = ["image/jpeg", "image/jpg", "image/png"];
export default defineComponent({
  components: { WxBar },
  setup() {
    const state: {
      message: string;
      fileList: Array<{ url: string; content?: string }>;
    } = reactive({
      message: "",
      fileList: []
    });

    const form = new BmobMessage(
      reactive({ name: "", content: "", files: [] })
    );

    function beforeRead(file: File) {
      if (ImageTypes.indexOf(file.type) === -1) {
        Toast("请上传 jpg或者 png 格式图片");
        return false;
      }
      return true;
    }
    function onOversize() {
      Toast("文件大小不能超过 500kb");
    }

    function submit() {
      console.log(state);
      const form = new BmobMessage({
        name: useRandomName(),
        content: state.message,
        files: []
      });
      form.create().then(() => {
        router.back();
      });
    }
    function toback() {
      router.back();
    }
    return { ...toRefs(state), form, beforeRead, onOversize, submit, toback };
  }
});
</script>

<style lang="less" scoped>
.form {
  .upload {
    padding: 10px 16px;
  }
}
</style>
