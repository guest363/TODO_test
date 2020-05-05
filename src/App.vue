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
  mounted() {
    const setCSSCustomPropVh = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setCSSCustomPropVh();
    window.addEventListener("resize", () => {
      setCSSCustomPropVh();
    });
  }
};
export default App;
</script>

<style lang="less" src="./css/imports-main.less"></style>
