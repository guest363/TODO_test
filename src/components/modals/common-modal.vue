<template>
  <transition name="modal">
    <div
      class="modal--mask modal"
      @keyup.esc="closeModalCommon($event)"
      @click="closeModalOnMask($event.target)"
      :id="id"
    >
      <div class="modal--wrapper">
        <div class="modal--grid">
          <div class="modal--header">
            <slot name="header"></slot>
          </div>
          <div class="modal--footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
/* За отображаемость компонента модальное окно отвечает его родитель
   Компонент только эмитит событие close, родитель слушает событие @close="closeModal" */

const modal = {
  props: {
    id: {
      type: String,
      default: "modal",
    },
  },
  methods: {
    closeModalCommon(e) {
      if (e.keyCode === 27) {
        this.close();
      }
    },
    closeModalOnMask(target) {
      target.id === `${this.id}` ? this.close() : "";
    },
    close() {
      this.$emit("close", this.id);
    },
  },
  created() {
    this.$store.commit("initNewModal", this.id);
  },
};

export default modal;
</script>

<style lang="less">
.modal--footer {
  .bt__delete,
  .bt__save {
    max-width: 45%;
  }
}
</style>

<style lang="less" scoped>
@mask--bg: rgba(151, 151, 151, 0.45);
.modal {
  /*   transition-property: none !important;
  transform: none !important;
  animation: none !important; */
  &--wrapper {
    display: inline-block;
    z-index: 500;
    max-height: 90%;
    margin: 0 auto;
    padding: 0;
    border-radius: 2px;
    transition: all 0.3s ease;
    max-width: 800px;
  }
  &--header {
    align-items: flex-start;
  }

  &--footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
  }
  &--mask {
    position: fixed;
    z-index: 550;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: @mask--bg;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.3s ease;
  }
  &--grid {
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding: 0 40px;
    border-radius: 3px;
  }
}
</style>
