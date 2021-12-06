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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";

export default defineComponent({
  name: "ABOUT",
  setup() {
    const todos = ref([]);
    const container = ref<HTMLElement>();

    const state = reactive({
      startY: 0
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
      const containerDom = container.value;
      if (containerDom) {
        containerDom.style.transition = "transform .6s";
        containerDom.style.transform = "translateY(" + -(100 / 3.75) + "vw)";
      }
    };

    return { todos, state, onDragStart, onDragOver, onDragEnd, container };
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
    min-height: 300px;

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
  }
}
</style>
