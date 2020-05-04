<template>
  <modal @close="$store.commit('closeModal', id)" :id="id" v-show="show">
    <template v-slot:header>
      <h2>
        Вы уверены, что хотите вернуться в списку заметок не сохранив внесенные
        изменения?
      </h2>
    </template>
    <template v-slot:footer>
      <button class="bt__save" @click="$emit('saveAndGo')">
        Сохранить изменения
      </button>
      <button class="bt__delete" @click="$emit('goWithOutSave')">
        Перейти без сохранения
      </button>
    </template>
  </modal>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
    },
  },
  computed: {
    show() {
      return this.$store.getters.getModalDisplayStatus(this.id);
    },
  },
};
</script>
