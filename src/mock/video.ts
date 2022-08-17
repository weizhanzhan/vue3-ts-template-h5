import { reactive } from "vue";

const videoList = [
  { url: "//player.alicdn.com/resource/player/qupai.mp4", key: 1 },
  { url: '//player.alicdn.com/video/editor.mp4"', key: 2 },
  { url: "http://player.alicdn.com/video/1.mp4", key: 3 },
  { url: "http://player.alicdn.com/video/11.mp4", key: 4 },
  {
    url:
      "http://cloud.video.taobao.com/play/u/1644398/p/1/e/6/t/1/254577045491.mp4",
    key: 5
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/3628894422/p/1/e/6/t/1/276870147700.mp4",
    key: 6
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/1644398/p/1/e/6/t/1/254577109657.mp4",
    key: 7
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/3545870717/p/1/e/6/t/1/248541592617.mp4",
    key: 8
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/1644398/p/1/e/6/t/1/254398960873.mp4",
    key: 9
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/1644398/p/1/e/6/t/1/254739726878.mp4",
    key: 10
  },
  {
    url:
      "https://cloud.video.taobao.com/play/u/2884690646/p/1/e/6/t/1/256308192024.mp4",
    key: 11
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/1644398/p/1/e/6/t/1/254889455891.mp4",
    key: 12
  },
  {
    url:
      "http://cloud.video.taobao.com/play/u/1644398/p/1/e/6/t/1/254577701657.mp4",
    key: 13
  },
  {
    url:
      "https://cloud.video.taobao.com/play/u/2884690646/p/1/e/6/t/1/227474919178.mp4",
    key: 14
  }
];
const state = reactive({
  page: 0,
  size: 5,
  initStart: 0,
  current: 0
});
const useVideo = () => {
  return new Promise<Array<{ key: number }>>(resolve => {
    const videoLength = videoList.length;
    const { page, size, initStart } = state;
    const start = page * size + initStart;
    const end = (page + 1) * size + initStart;
    let result: Array<{ key: number }> = [];
    if (videoLength - start >= size) {
      result = videoList.slice(start, end);
      state.page++;
    } else {
      const completeCount = videoLength - start;
      const unCompleteCount = size - completeCount;
      result = videoList.slice(start);
      result.push(...videoList.slice(0, unCompleteCount));
      state.page = 0;
      state.initStart = unCompleteCount;
    }
    resolve(result);
  });
};

const useVideoCurrent = () => {
  return new Promise<Array<{ key: number }>>(resolve => {
    const { current } = state;
    let result: Array<{ key: number }> = [];
    if (current + 1 >= videoList.length) {
      const start = current - 2;
      const end = videoList.length;
      result = videoList.slice(start, end);
      result.push(...videoList.slice(0, videoList.length - end));
    } else {
      if (current < 2) {
        result = videoList.slice(current - 2);
        result.push(...videoList.slice(0, current + 3));
      } else {
        const start = current - 2;
        const end = current + 3;
        result = videoList.slice(start, end);
      }
    }
    if (state.current === videoList.length) {
      state.current = 0;
    } else {
      state.current++;
    }

    resolve(result);
  });
};

export { useVideo, useVideoCurrent };
