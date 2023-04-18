<template>
  <div class="">
    {{ message }}

    <button class="button" @click="reverseMessage">
      Перевернуть сообщение
    </button>

    <div v-if="elementVisibility" class="">Сейчас меня видно</div>

    <div class="" v-for="(listItem, idx) in listItems" :key="idx">
      {{ listItem.text }}
    </div>

    <TodoItem
      v-for="(listItem, idx) of listItems"
      :todo="listItem.text"
      v-bind:key="idx"
    />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "HelloWorld",

  data() {
    return {
      message: "hello",
      elementVisibility: true,
      listItems: [
        { text: "hello" },
        { text: "world" },
        { text: "its" },
        { text: "vue3" },
      ],
    };
  },

  methods: {
    reverseMessage() {
      this.message = this.message.split("").reverse().join("");
    },
  },

  components: {
    TodoItem,
  },
};
</script>

<style>
.button {
  display: block;
  background-color: blue;
  color: white;
}
</style>
