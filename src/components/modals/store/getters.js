const getters = {
  getModalDisplayStatus: state => id => {
    return state.isShowModal[id];
  },
};
export default getters;
