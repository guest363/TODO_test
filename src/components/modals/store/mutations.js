import Vue from "vue";

const mutations = {
  showModal(state, id) {
    Vue.set(state.isShowModal, id, true)
  },
  closeModal(state, id) {
    Vue.set(state.isShowModal, id, false)
  },
  initNewModal(state, id) {
    Vue.set(state.isShowModal, id, false)
  }

};
export default mutations;
