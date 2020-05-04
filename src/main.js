import Vue from "vue";
import App from "./App.vue";
import router from "./router.js";
import store from "./localStore/store.js";

/* Свои компоненты с глобальной регистрацией */
import modal from "./components/modals/common-modal.vue";

Vue.component("modal", modal);

Vue.config.productionTip = false;
/* Глобальная директива на фокус при вставке в DOM */
Vue.directive("focus", {
  inserted(el) {
    el.focus();
  },
});

new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(App),
});
