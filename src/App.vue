<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

@font-face {
  font-family: "webfont";
  font-display: swap;
  src: url("//at.alicdn.com/t/webfont_9k45pffuki.eot"); /* IE9*/
  src: url("//at.alicdn.com/t/webfont_9k45pffuki.eot?#iefix")
      format("embedded-opentype"),
    /* IE6-IE8 */ url("//at.alicdn.com/t/webfont_9k45pffuki.woff2")
      format("woff2"),
    url("//at.alicdn.com/t/webfont_9k45pffuki.woff") format("woff"),
    /* chrome、firefox */ url("//at.alicdn.com/t/webfont_9k45pffuki.ttf")
      format("truetype"),
    /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
      url("//at.alicdn.com/t/webfont_9k45pffuki.svg#Alibaba-PuHuiTi-Regular")
      format("svg"); /* iOS 4.1- */
}
body {
  font-family: "webfont" !important;
}
</style>
