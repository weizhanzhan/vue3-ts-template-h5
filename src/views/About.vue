<template>
  <div class="about">
    {{ loading }}
    {{ state }}
    <input type="text" v-model="state.value" />
    <input type="button" value="刷新" @click="submit" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useAsync } from "@/hooks/useAsync";
import axios from "axios";

export default defineComponent({
  name: "ABOUT",
  setup() {
    const todos = ref([]);
    const state = reactive({
      value: "",
      a: {
        b: {
          c: 1
        }
      }
    });

    async function getTodos() {
      todos.value = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
    }
    const { loading, refresh } = useAsync(getTodos);

    function submit() {
      refresh();
    }

    return { loading, todos, submit, state };
  },
  activated() {
    console.log("我被缓存了");
  }
});
</script>
<style lang="less" scoped></style>
