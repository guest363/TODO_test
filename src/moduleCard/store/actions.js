import { deleteProp } from "./support/deleteProp.js";
const actions = {
  INIT_STATE({ state, commit }) {
    const cards = JSON.parse(localStorage.getItem(state.STORAGE_KEY) || "{}");
    commit("SAVE_CARDS", cards);
    const makeShorterTodo = (card) => {
      card.hasMoreItems = card.items.length > state.maxCardOnPreview;
      card.items.length =
        card.items.length > state.maxCardOnPreview
          ? state.maxCardOnPreview
          : card.items.length;
      return card;
    };
    const allCards = JSON.parse(
      localStorage.getItem(state.STORAGE_KEY) || "{}"
    );
    let shortView = [];
    for (let card in allCards) {
      // noinspection JSUnfilteredForInLoop
      let shortCard = makeShorterTodo(allCards[card]);
      shortCard.id = card;
      shortView.push(shortCard);
    }
    shortView.sort((a, b) => b.date - a.date);
    commit("SAVE_SHORT_VIEW", shortView);
  },
  POST_CARDS({ getters, state, dispatch }) {
    try {
      localStorage.setItem(
        getters.GET_LOCAL_STORAGE_KEY,
        JSON.stringify(state.cards)
      );
    } catch (error) {
      console.error(error);
    }
    dispatch("INIT_STATE");
  },
  SAVE_CARD({ state, dispatch }, card) {
    state.cards[card.id] = card;
    dispatch("POST_CARDS");
  },
  DELETE_CARD({ state, dispatch }, id) {
    const deleteCard = deleteProp(id);
    state.cards = deleteCard(state.cards);
    dispatch("POST_CARDS");
  },
};
export default actions;
