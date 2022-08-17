/* eslint-disable @typescript-eslint/no-var-requires */
import { defineComponent, reactive } from "vue";
import "./index.less";
import { useVideoCurrent } from "@/mock/video";
export default defineComponent({
  setup() {
    const state = reactive({});
    const video = require("@/assets/video/301250279.mp4");
    const getData = () => {
      useVideoCurrent().then((res: Array<{ key: number }>) => {
        console.log(res.map(item => item.key));
      });
    };
    return () => (
      <div class="videoBox">
        {/* <button onClick={getData}>获取数据</button> */}
        <div class="swipeBox">
          <van-swipe vertical class="swiperDom" show-indicators={false}>
            <van-swipe-item class="swipe-item">
              <video class="video-item" autoplay="true" src={video}></video>
            </van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
          </van-swipe>
        </div>
        <div class="appBar">1</div>
      </div>
    );
  }
});
