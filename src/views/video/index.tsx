import { defineComponent, reactive } from "vue";
import "./index.less";
export default defineComponent({
  setup() {
    const state = reactive({ count: 0 });
    const handleClick = () => state.count++;
    return () => (
      <div class="videoBox">
        <div class="swipeBox">
          <van-swipe vertical class="swiperDom" show-indicators={false}>
            <van-swipe-item>1</van-swipe-item>
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
