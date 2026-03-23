<template>
  <h1>Vue - App</h1>
  <h1>TODOS</h1>

  <ul>
    <li :class="{ done: 1 }" v-for="todo in todos" :key="todo" @click="toggleItemState(todo.id)">
      {{ todo.title }}
      <span v-if="todo.completed"></span>
    </li>
  </ul>

  <input type="text" v-model="item" placeholder="Todo item" @keydown.enter="addItem" />
</template>

<script>
export default {
  data() {
    return {
      item: "",
      todos: [
        {
          id: 1,
          title: "Item A",
          completed: false,
        },
        {
          id: 2,
          title: "Item B",
          completed: false,
        },
      ],
    };
  },
  computed: {},
  methods: {
    addItem() {
      // console.log(this.item);
      if (this.item === "") return;
      this.todos.push(this.item);
      this.item = "";
    },
    toggleItemState(itemId) {
      const item = this.todos.find((todo) => todo.id === itemId);
      item.completed = !item.completed;
    },
  },
};
</script>

<style>
input[type="text"] {
  display: block;
  font-size: 40px;
}
</style>
