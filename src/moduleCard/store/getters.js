const randomID = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};
const getters = {
  GET_CARDS(state) {
    return state.cards;
  },
  GET_LOCAL_STORAGE_KEY(state) {
    return state.STORAGE_KEY;
  },
  GET_SHORT_CARDS_VIEW(state) {
    return state.shortView;
  },
  GET_TODO_LIST: (state) => (id) => {
    return JSON.parse(localStorage.getItem(state.STORAGE_KEY))[id].items;
  },
  GET_CARD: (state) => (id) => {
    const emptyCard = {
      items: [],
      header: "",
      id: randomID(),
    };
    return state.cards[id] ? { ...state.cards[id] } : emptyCard;
  },
};
export default getters;
