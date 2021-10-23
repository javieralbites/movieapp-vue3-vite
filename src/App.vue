<template>
  <Navbar />
  <!-- <keep-alive> -->
  <router-view :key="$route.fullPath"></router-view>
  <!-- </keep-alive> -->
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
};
</script>

<style lang="scss">
@import "./assets/style/main.scss";
</style>
