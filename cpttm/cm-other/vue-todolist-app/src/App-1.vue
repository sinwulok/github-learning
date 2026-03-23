<template>
  <h1>Vue - App</h1>

  <div class="yellow">
    <input type="text" v-model="countA" />
    <button @click="countAdecrement">-</button>
    <button @click="countAincrement">+</button>
  </div>
  <div class="cyan">
    <input type="text" v-model="countB" />
    <button @click="countBdecrement">-</button>
    <button @click="countBincrement">+</button>
  </div>

  <h1 :class="{ red: total < 60, border: total < 30 }">{{ total }}</h1>
  <h2 v-if="total < 60">Failed</h2>
  <h2 v-else>Pass</h2>

  <!-- <img :src="imageUrl" alt="" /> -->
</template>

<script>
export default {
  data() {
    return {
      countA: 10,
      countB: 20,
    };
  },
  computed: {
    total() {
      // return parseInt(this.countA + this.countB)
      // return number(this.countA) + number(this.countB)
      return +this.countA + +this.countB;
    },
  },
  methods: {
    countAincrement() {
      this.countA++;
    },
    countAdecrement() {
      this.countA--;
    },
    countBincrement() {
      this.countB++;
    },
    countBdecrement() {
      this.countB--;
    },
  },
};
</script>

<style>
input[type="text"] {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  display: block;
  width: 100%;
  font-size: 40px;
}

button {
  font-size: 40px;
  width: 60px;
  margin: 10px;
}

.yellow {
  background-color: yellow;
  padding: 20px;
}

.cyan {
  background-color: cyan;
  padding: 20px;
}

h1 {
  padding: 10px;
}

.red {
  background-color: red;
  color: white;
}
</style>
