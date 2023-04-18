<template>
  <div class="todo-item">{{ todo }}</div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.todo-item {
  background-color: lightgray;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
}
</style>
