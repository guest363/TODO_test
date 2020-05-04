<template>
  <div class="cards__wrapper">
    <div v-show="isHaveNoCards">
      <h2 style="margin-bottom: 2em; text-align: center;">
        Пока не созданно ни одной карточки с задачами.
      </h2>
    </div>
    <div class="cards cards--grid">
      <div class="card card__short--nav" :class="{card__many: card.hasMoreItems}" v-for="card in cards" v-bind:key="card.id">
        <div class="card--actions">
          <button
            class="bt__delete card--actions--item icon-bin2"
            @click="confirmRemoveCard(card.id)"
          ></button>
        </div>
        <h3 class="card--header" @click="openCard(card.id)">
          {{ card.header }}
        </h3>
        <div class="card--content" @click="openCard(card.id)">
          <ul class="todo-list">
            <li
              v-for="(todo, index) in card.items"
              class="todo"
              v-bind:key="index"
            >
              <todo-item :index="index" :todo="todo" :disabled="true" />
            </li>
          </ul>
        </div>
      </div>
    </div>
    <button
      class="add-button flex-center icon-plus"
      @click="openCard()"
    ></button>
    <confirm-modal :id="delModalID" @delete="removeCard" />
  </div>
</template>

<script>
import confirmModal from "../../components/modals/confirm-delete-modal.vue";
import todoItem from "../components/todoItem";
const cardList = {
  name: "All_cards",
  data() {
    return {
      idCardToRemove: "",
      delModalID: "deleteModal",
    };
  },
  components: { confirmModal, todoItem },
  computed: {
    isHaveNoCards() {
      return Object.keys(this.$store.getters.GET_CARDS).length === 0;
    },
    cards() {
      return this.$store.getters.GET_SHORT_CARDS_VIEW;
    },
  },
  methods: {
    openCard(name = "") {
      const cardPath = name === "" ? "/newCard" : `/cards/${name}`;
      const cardName = name === "" ? "Новая карточка" : `${name}`;
      this.$router.push({
        path: cardPath,
        params: { id: name },
      });
    },
    removeCard() {
      this.$store.dispatch("DELETE_CARD", this.idCardToRemove);
      this.$store.commit("closeModal", this.delModalID);
    },
    confirmRemoveCard(id) {
      this.idCardToRemove = id;
      this.$store.commit("showModal", this.delModalID);
    },
  },
  created() {
    this.$store.dispatch("INIT_STATE");
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
export default cardList;
</script>

<style lang="less" src="../css/index.less" scoped></style>
<style lang="less" src="../css/grid.less" scoped></style>
