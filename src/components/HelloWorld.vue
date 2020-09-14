<template>
  <div class="hello">
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

<style scoped lang="scss"></style>
