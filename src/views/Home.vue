<template>
  <div class="home">
    {{ state.count }}
    <button @click="addCounter(123)">+</button>
    <van-button> 123 </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
export default defineComponent({
  setup() {
    const state = reactive({
      count: 0
    })
    function addCounter(num: number) {
      state.count += num
    }
    return {
      state,
      addCounter
    }
  }
})
</script>
