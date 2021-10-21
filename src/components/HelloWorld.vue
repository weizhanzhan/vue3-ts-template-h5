<template>
  <div class="hello" style="margin-top:20px">
    我是子组件计数器：
    <button @click="addClick">{{ state.count }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      count: 0
    });
    const addClick = () => {
      state.count++;
    };
    return {
      state,
      addClick
    };
  }
});
</script>

<style scoped></style>
