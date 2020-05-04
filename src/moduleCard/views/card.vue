<template>
  <div class="card__wrapper">
    <div class="card card__single">
      <div class="card--header">
        <label>
          <input
            type="text"
            placeholder="Название списка"
            class="card--header--input"
            v-model="card.header"
          />
        </label>
      </div>
      <div class="card--content">
        <ul class="todo-list">
          <li
            v-for="(todo, index) in card.items"
            class="todo-list--item"
            :key="index"
          >
            <todo-item
              :index="index"
              :todo="todo"
              :doneEdit="doneEdit"
              :cancelEdit="cancelEdit"
              :removeTodo="removeTodo"
              :editTodo="editTodo"
              :addTodo="addTodo"
              :removeEmpty="removeEmpty"
              @input="card.items[index].title = $event"
              @check="checkedTodo(todo, $event)"
            />
          </li>
        </ul>
      </div>
      <div class="card--actions card--actions__single">
        <button
          class="bt__delete card--actions--item icon-bin2 card--actions__single--item"
          @click="confirmRemoveCard()"
        ></button>
        <button
          class="bt__save icon-floppy-disk card--actions--item card--actions__single--item"
          @click="saveCard"
        ></button>
        <button
          :disabled="historyPosition < 1"
          class="bt__delete icon-undo2 card--actions--item card--actions__single--item"
          @click="undo"
        ></button>
        <button
          class="bt__delete icon-redo2 card--actions--item card--actions__single--item"
          @click="redo"
          :disabled="history.length - 1 <= historyPosition"
        ></button>
        <button
          class="bt__cancel icon-home card--actions--item card--actions__single--item"
          @click="goHome"
        ></button>
      </div>
    </div>
    <confirm-delete-modal :id="delModalID" @delete="removeCard" />
    <confirm-save-modal
      :id="saveModalID"
      @saveAndGo="saveAndGo"
      @goWithOutSave="goWithOutSave"
    />
  </div>
</template>

<script>
import todoItem from "../components/todoItem";
import confirmDeleteModal from "../../components/modals/confirm-delete-modal";
import confirmSaveModal from "../../components/modals/confirm-save-modal";

export default {
  data() {
    return {
      card: {},
      editedTodo: null,
      history: [],
      historyPosition: 0,
      hasUnsavedActions: false,
      delModalID: "delete",
      saveModalID: "save"
    };
  },
  components: { todoItem, confirmDeleteModal, confirmSaveModal },
  props: {
    id: {
      type: String,
      default: ""
    }
  },
  methods: {
    initHistory() {
      this.history.push(JSON.parse(JSON.stringify(this.card.items)));
    },
    checkedTodo(todo, value) {
      todo.completed = value;
      this.addToHistory();
    },
    addToHistory() {
      const sliceHistory = () => {
        const historyLength = this.history.length - 1;
        const isWeInHistory = historyLength !== this.historyPosition;
        if (isWeInHistory) {
          this.history = this.history.slice(0, this.historyPosition);
        }
      };
      sliceHistory();
      this.historyPosition += 1;
      this.hasUnsavedActions = true;
      /* Deep copy */
      this.history.push(JSON.parse(JSON.stringify(this.card.items)));
    },
    addTodo({ todo, index } = {}) {
      /**
       * @description Добавляет новый пустой пункт в список
       */
      const createEmptyTodo = () => {
        const emptyTodo = {
          title: "",
          completed: false
        };
        this.card.items.splice(index + 1, 0, emptyTodo);
      };
      const hasTodo = todo !== void 0;
      /**
       * @description При открытии пустого списка сразу фокусить на списке задачь
       * так как заголовок для списка не обязателен. Куда важнее быстрее занести список.
       */
      if (!hasTodo) {
        createEmptyTodo();
        this.$nextTick(() => {
          this.$refs["input_item_0"].focus();
        });
        return;
      }

      const hasEmptyTodo = hasTodo && !todo.title;
      const emptyNewTodoAndHasNextTodo =
        hasEmptyTodo && this.card.items[index + 1] !== void 0;
      /**
       * @description В случае нажатия enter на пустом todo,
       * пустой todo удаляется в фокус переходит на редактирование предыдущего
       */

      if (emptyNewTodoAndHasNextTodo) {
        this.$refs["input_item_" + (index - 1)].focus();
        return;
      }
      /**
       * @description Нельзя отсавлять пустые пункты
       */
      if (hasEmptyTodo) {
        return;
      }

      createEmptyTodo();

      this.doneEdit(todo);
      this.$nextTick(() => {
        this.$refs["input_item_" + (index + 1)].focus();
      });
    },
    /**
     * @description При изменении todo обновляет историю изменений
     */
    doneEdit(todo) {
      if (this.beforeEditCache === todo.title) return;
      !todo.title ? this.removeTodo(todo) : this.addToHistory();
    },
    saveCard() {
      this.hasUnsavedActions = false;
      this.$store.dispatch("SAVE_CARD", this.card);
    },
    /**
     * @description При расфокусе удаляет пустой todo для которого еще
     * не было события change
     */
    removeEmpty({ title, index }) {
      if (!title && index > 0) {
        this.card.items.splice(index, 1);
      }
    },
    removeTodo(index) {
      this.card.items.splice(this.card.items[index], 1);
      if (this.card.items[0] === void 0) {
        this.addTodo();
        return;
      }
      this.addToHistory();
    },
    goHome() {
      if (this.hasUnsavedActions) {
        this.$store.commit("showModal", this.saveModalID);
        return;
      }
      this.$router.push("/");
    },
    saveAndGo() {
      this.hasUnsavedActions = false;
      this.saveCard();
      this.goHome();
    },
    goWithOutSave() {
      this.hasUnsavedActions = false;
      this.goHome();
    },
    /**
     * @description сохраняет изменений todo в кеш
     */
    editTodo(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },
    travelInHistory() {
      this.card.items = "";
      this.card.items = JSON.parse(
        JSON.stringify(this.history[this.historyPosition])
      );
    },
    undo() {
      this.historyPosition -= 1;
      this.travelInHistory();
    },
    redo() {
      this.historyPosition += 1;
      this.travelInHistory();
    },
    cancelEdit(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },
    confirmRemoveCard() {
      this.$store.commit("showModal", this.delModalID);
    },
    removeCard() {
      this.$store.dispatch("DELETE_CARD", this.$props.id);
      this.$store.commit("closeModal", this.delModalID);
    }
  },
  beforeMount() {
    this.card = this.$store.getters.GET_CARD(this.$props.id);
    this.card.items[0] === void 1 ? this.addTodo() : this.initHistory();
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  beforeDestroy() {
    this.$store.commit("closeModal", this.delModalID);
    this.$store.commit("closeModal", this.saveModalID);
  }
};
</script>

<style lang="less" src="../css/index.less" scoped></style>
<style lang="less" src="../css/grid.less" scoped></style>
