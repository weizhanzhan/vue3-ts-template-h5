<template>
  <app-container title="Vue3 Vuex">
    <h1 class="title">This is Vuex Demo:</h1>
    <div class="count">
      {{ count }}
    </div>
    <div class="action">
      <van-button type="primary" @click="increase">increase</van-button>
      <van-button type="warning" @click="decrease">increase</van-button>
    </div>
    <ChildComponent />
  </app-container>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, computed } from "vue";
import { useStore } from "vuex";
import ChildComponent from "@/components/HelloWorld.vue";
import provideStore from "@/utils/provideStore";
export default defineComponent({
  name: "VUEX",
  components: {
    ChildComponent
  },
  setup() {
    console.log("vuex", provideStore.planList);
    const store = useStore();
    const state = reactive({
      count: computed(() => store.state.demo.count)
    });

    const increase = () => {
      store.commit("increase");
    };
    const decrease = () => {
      store.commit("decrease");
    };
    return {
      ...toRefs(state),
      increase,
      decrease
    };
  }
});
</script>
<style lang="less" scoped>
// @import "@assets/style/mixin.scss";
.title {
  padding: 10px;
  font-size: 18px;
}
.count {
  height: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.action {
  text-align: center;
  width: 80%;
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
}
</style>
