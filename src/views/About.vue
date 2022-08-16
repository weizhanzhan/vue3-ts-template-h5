<template>
  <div class="mine">
    <div class="my-head">
      <img :src="require('@/assets/images/banner1.jpg')" alt="" />
      <span class="head-title">我的</span>
    </div>
    <div
      class="my-container"
      ref="container"
      :draggable="true"
      @touchstart="onDragStart($event)"
      @touchmove="onDragOver($event)"
      @touchend="onDragEnd($event)"
    >
      <div class="info-box">
        <div class="my-info">
          <div class="avatar">
            <img src="@assets/images/avatar1.jpg" alt="" srcset="" />
          </div>
          <div class="intro">
            <div class="name">
              <span>weizhanzhan</span>
              <div class="info-tag">
                <i class="iconfont iconjinpai"></i>
                <span>年度最佳CV工程师</span>
              </div>
            </div>
            <div class="desc">一只小前端✌</div>
          </div>
        </div>
        <div class="more-info">
          <div class="more-item">
            <div class="value">30</div>
            <div class="name">粉丝</div>
          </div>
          <div class="more-item">
            <div class="value">20</div>
            <div class="name">关注</div>
          </div>
          <div class="more-item">
            <div class="value">1K+</div>
            <div class="name">获赞</div>
          </div>
        </div>
        <div class="action-box">
          <div class="my-button large send-msg">
            私信
          </div>
          <div class="my-button large watch">
            已关注
          </div>
        </div>
      </div>
      <div class="talk">
        <van-tabs
          v-model:active="activeModule"
          sticky
          class=" my-tab"
          color="#85a5ff"
        >
          <van-tab title="动态">
            <div class="talk-item">
              <div class="talk-user">
                <div class="avatar">
                  <img src="@assets/images/avatar1.jpg" alt="" srcset="" />
                </div>
                <div class="info">
                  <div class="name">weizhanzhan</div>
                  <div class="date">12-11发布了动态</div>
                </div>
                <div class="more">
                  ...
                </div>
              </div>
              <div class="talk-content">
                <div class="content-text">
                  冬天总是爱犯困😪
                </div>
                <div class="content-img">
                  <img
                    class="img1"
                    :src="talk1Img"
                    alt=""
                    @click="showImg([talk1Img])"
                    srcset=""
                  />
                  <img
                    class="img2"
                    :src="talk2Img"
                    alt=""
                    srcset=""
                    @click="showImg([talk2Img])"
                  />
                </div>
              </div>
              <div class="talk-action">
                <!-- 点赞70 -->
                <div class="like">
                  <van-icon name="like" size="16" color="red" /> <span>79</span>
                </div>
                <div class="comment">
                  <van-icon name="comment-o" size="16" /><span>12</span>
                </div>
                <div class="guide">
                  <van-icon name="guide-o" size="16" /> <span>10</span>
                </div>
              </div>
            </div>
          </van-tab>
          <van-tab title="话题">
            1
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { showImg } from "@/utils/utils";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const talk1Img = require("@/assets/images/talk1.png");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const talk2Img = require("@/assets/images/talk2.png");
export default defineComponent({
  name: "ABOUT",
  setup() {
    const todos = ref([]);
    const container = ref<HTMLElement>();

    const person = reactive({
      state: {
        age: 0,
        name: "weizhanzhan"
      },
      methods: {
        setAge: (age: number) => {
          person.state.age = age;
        }
      }
    });

    const state = reactive({
      startY: 0,
      activeModule: 0
    });

    // async function getTodos() {
    //   todos.value = await axios.get(
    //     "https://jsonplaceholder.typicode.com/todos/1"
    //   );
    // }
    // const { loading, refresh } = useAsync(getTodos);

    // function submit() {
    //   refresh();
    // }
    const onDragStart = (e: TouchEvent) => {
      state.startY = e.changedTouches[0].clientY;
    };
    const onDragOver = (e: TouchEvent) => {
      const clientY = e.changedTouches[0].clientY;
      const containerDom = container.value;
      const initClientY = -100;
      const scrollAble = clientY - state.startY;

      let y = scrollAble + initClientY;
      y = y / 3.75;
      if (containerDom) {
        containerDom.style.transition = "none";
        containerDom.style.transform = "translateY(" + y + "vw)";
      }
    };
    const onDragEnd = (e: TouchEvent) => {
      console.log(e);
      const containerDom = container.value;
      if (containerDom) {
        containerDom.style.transition = "transform .6s";
        containerDom.style.transform = "translateY(" + -(100 / 3.75) + "vw)";
      }
    };

    return {
      todos,
      state,
      onDragStart,
      onDragOver,
      onDragEnd,
      container,
      person,
      showImg,
      talk1Img,
      talk2Img
    };
  }
});
</script>
<style lang="less" scoped>
.mine {
  position: relative;
  background: #262626;
  height: 100%;
  .my-head {
    position: relative;
    img {
      width: 100%;
    }
    .head-title {
      position: absolute;
      left: 12px;
      top: 14px;
      font-size: 18px;
      color: #ffffff;
      font-weight: bold;
    }
  }
  .my-container {
    min-height: 600px;
    background: #ffffff;
    transform: translateY(-100px);
    border-radius: 15px 15px 0 0;
    .my-info {
      display: flex;
      padding: 20px;
      .avatar {
        img {
          width: 50px;
          border-radius: 50%;
        }
      }
      .intro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 12px;
        .name {
          font-size: 16px;
          font-weight: bold;
          .info-tag {
            margin-left: 6px;
            background: #000000;
            font-size: 12px;
            border-radius: 4px;
            display: inline-block;
            padding: 1px 2px;
            color: #ffffff;
            .iconjinpai {
              color: #ffc53d;
              font-size: 14px;
            }
            span {
              vertical-align: top;
            }
          }
        }
        .desc {
          margin-top: 6px;
          color: rgba(13, 27, 62, 0.65);
          font-size: 13px;
        }
      }
    }
    .more-info {
      display: flex;
      padding: 0 20px;
      text-align: center;
      .more-item {
        margin-right: 30px;
        .value {
          font-weight: 600;
          letter-spacing: 1px;
        }
        .name {
          margin-top: 4px;
          font-size: 12px;
          color: rgba(13, 27, 62, 0.65);
        }
      }
    }
    .action-box {
      display: flex;
      padding: 20px;
      .send-msg {
        margin-right: 20px;
      }
      .watch {
        background-color: rgb(34, 34, 34);
        color: #ffffff;
      }
    }
    .talk {
      padding-left: 12px;
      .talk-item {
        margin-top: 12px;
        .talk-user {
          display: flex;
          .avatar {
            width: 50px;
            img {
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            padding-top: 4px;
            .name {
              font-size: 16px;
              font-weight: bold;
            }
            .date {
              color: rgba(13, 27, 62, 0.65);
              font-size: 13px;
              margin-top: 4px;
            }
          }
          .more {
            width: 40px;
          }
        }
        .talk-content {
          margin-top: 12px;
          font-size: 14px;
          font-weight: 500;
          .content-img {
            margin-top: 12px;
            img {
              width: 170px;
              height: 110px;
            }
            .img1 {
              border-top-left-radius: 20px;
              margin-right: 10px;
            }
            .img2 {
              border-bottom-right-radius: 20px;
            }
          }
        }
        .talk-action {
          font-size: 13px;
          margin-top: 8px;
          display: flex;
          .like {
            margin-right: 16px;
          }
          .comment {
            margin-right: 16px;
            line-height: 1;
          }
          span {
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
