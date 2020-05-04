<template>
  <div class="page404 flex-center">
    <h1 class="page404--header">
      Такой странице нет, зато <router-link to="/">здесь</router-link> можно
      составить свой TODO лист.
    </h1>
  </div>
</template>

<script>
export default {
  name: "page404",
};
</script>

<style lang="less" scoped>
@bg-color: #f5faff;
.page404 {
  min-height: 100vh;
  max-height: 100vh;
  width: 100%;
  background-color: @bg-color;
  position: relative;
  a {
    text-decoration: none;
  }
  &--header {
    margin: 20px 0 60px 0;
    text-align: center;
    color: var(--grey);
    line-height: 1.7em;
  }
}
</style>
