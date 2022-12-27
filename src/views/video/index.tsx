/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ComponentPublicInstance,
  defineComponent,
  effect,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect
} from "vue";
import "./index.less";
import { useVideoCurrent } from "@/mock/video";

interface VideoOption {
  id: number;
  src: string;
  playing: boolean;
}
export default defineComponent({
  setup() {
    const state: {
      videos: VideoOption[];
      previousVideoIndex: number;
      autoPlay: boolean;
    } = reactive({
      videos: [
        {
          id: 1,
          src: "https://www.runoob.com/try/demo_source/movie.mp4",
          playing: false
        },
        {
          id: 2,
          src: "//player.alicdn.com/video/editor.mp4",
          playing: false
        },
        {
          id: 3,
          src: "//player.alicdn.com/video/aliyunmedia.mp4",
          playing: false
        },
        {
          id: 4,
          src: "//player.alicdn.com/video/guanggao.mp4",
          playing: false
        }
      ],
      previousVideoIndex: -1,
      videoRefs: [],
      autoPlay: true
    });

    const videoRefs = ref<ComponentPublicInstance[] | Element[]>([]);
    const getData = () => {
      useVideoCurrent().then((res: Array<{ key: number }>) => {
        console.log(res.map(item => item.key));
      });
    };

    const videoClick = (video: VideoOption, index: number) => {
      const currentVideoRef = videoRefs.value[index] as HTMLVideoElement;
      if (video.playing) {
        currentVideoRef.pause();
        video.playing = false;
      } else {
        currentVideoRef.play();
        video.playing = true;
      }
    };
    const onSwiperChange = (index: number) => {
      state.autoPlay = false;
      const currentVideoRef = videoRefs.value[index] as HTMLVideoElement;
      currentVideoRef && currentVideoRef.play();
      state.videos[index].playing = true;
      state.previousVideoIndex = index;
    };
    onMounted(() => {
      //首次进来，默认播放第一个
      // const v1 = document.getElementById("v1") as HTMLVideoElement;
      // v1.play();
    });

    watch(videoRefs, () => {
      console.log("watch change");
    });

    return () => (
      <div class="videoBox">
        {/* <button onClick={getData}>获取数据</button> */}
        <div class="swipeBox">
          <van-swipe
            vertical
            class="swiperDom"
            show-indicators={false}
            onChange={(active: number) => onSwiperChange(active)}
          >
            {...state.videos.map((video, index) => {
              return (
                <van-swipe-item
                  class="swipe-item"
                  key={video.id}
                  onclick={() => videoClick(video, index)}
                >
                  <video
                    class="video-item"
                    ref={el => el && (videoRefs.value[index] = el)}
                    id={video.id.toString()}
                  >
                    <source src={video.src} type="video/mp4"></source>
                  </video>
                </van-swipe-item>
              );
            })}
          </van-swipe>
        </div>
        <div class="appBar">1</div>
      </div>
    );
  }
});
