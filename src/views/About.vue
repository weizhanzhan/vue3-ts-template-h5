<template>
  <div class="about">
    <h1>You can leave me a message on the home page</h1>
    {{ input }}
    <input type="text" v-model="input" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import axios from "axios";
export default defineComponent({
  name: "About",
  setup() {
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => {
      console.log(res);
    });
    const input = ref("");
    return { input };
  }
});
</script>
<style lang="less" scoped>
.about {
  // background: @green1;
}
</style>
