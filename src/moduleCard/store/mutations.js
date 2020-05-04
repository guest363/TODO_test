const mutations = {
  SAVE_CARDS(state, cards) {
    /* Object.assign(state.cards, { ...cards }); */
    state.cards = { ...cards };
  },
  SAVE_SHORT_VIEW(state, view) {
    state.shortView = [...view];
  },
};
export default mutations;
