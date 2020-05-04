<template>
  <modal @close="$store.commit('closeModal', id)" :id="id" v-show="show">
    <template v-slot:header>
      <h2>Вы уверены, что хотите удалить заметку?</h2>
    </template>
    <template v-slot:footer>
      <button class="bt__save" @click="$store.commit('closeModal', id)">
        Нет, отменить удаление
      </button>
      <button class="bt__delete" @click="$emit('delete')">Да, удалить</button>
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
