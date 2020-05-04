<template>
  <main id="app" class="flex-center">
    <transition name="fade--page" tag="div" mode="out-in">
      <router-view />
    </transition>
  </main>
</template>

<script>
const App = {
  name: "App",
  computed: {},
};
export default App;
</script>

<style lang="less" src="./css/imports-main.less"></style>
