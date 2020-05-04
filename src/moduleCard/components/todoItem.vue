<template functional>
  <div class="todo">
    <label class="todo--checkbox">
      <input
        class="todo--checkbox--toggle"
        type="checkbox"
        v-model="props.todo.completed"
        @input="listeners.check($event.target.checked)"
        :disabled="props.disabled || false"
      />
      <span class="todo--checkbox--span"></span>
    </label>

    <label>
      <input
        :disabled="props.disabled || false"
        class="todo--edit"
        type="text"
        :value="props.todo.title"
        placeholder="Что нужно сделать?"
        @click="props.editTodo(props.todo)"
        @change="props.doneEdit(props.todo)"
        @blur="props.removeEmpty({ title: props.todo.title, index: props.index })"
        @keyup.enter="
          props.addTodo({
            todo: props.todo,
            index: props.index,
          })
        "
        :class="{ completed: props.todo.completed }"
        @keyup.esc="props.cancelEdit(props.todo)"
        @input="listeners.input($event.target.value)"
        :ref="'input_item_' + props.index"
      />
    </label>
    <button
      class="todo--destroy icon-bin2"
      @click="props.removeTodo(props.index)"
      :disabled="props.disabled || false"
      v-show="!props.disabled"
    ></button>
  </div>
</template>

<style lang="less" scoped>
.completed {
  text-decoration: line-through;
}
*:disabled {
  background: none;
  pointer-events: none;
}
.todo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &--edit {
    display: block;
    padding: 12px 16px;
    border: 0;
    width: 100%;
    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #b4b4b4;
      opacity: 1; /* Firefox */
    }
  }
  &--checkbox {
    width: 60px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &--toggle {
      z-index: -99999;
      position: absolute;
      opacity: 0;

      & + .todo--checkbox--span {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: center left;
      }
      &:checked + .todo--checkbox--span {
        background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
      }
    }
    &--span {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  &--destroy {
    display: block;
    opacity: 0.6;
    padding: 0 10px;
    border: none;
    background: none;
    &:hover {
      background-color: #e79c9c;
    }
  }
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .todo--checkbox--toggle {
    background: none;
  }
}
</style>
