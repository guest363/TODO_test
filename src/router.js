/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  /* mode: "history", */
  routes: [
    {
      path: "/",
      name: "Заметки с TODO",
      component: () => import("./moduleCard/views/index.vue"),
    },
    {
      path: "/cards/:id",
      name: "Заметка",
      props: (route) => ({ id: route.params.id }),
      component: () => import("./moduleCard/views/card.vue"),
    },
    {
      path: "/newCard",
      component: () => import("./moduleCard/views/card.vue"),
    },
    {
      path: "*",
      name: "Такой страницы пока нет. 404",
      component: () => import("./page404.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `${to.name || ""}`;
  next();
});

export default router;
