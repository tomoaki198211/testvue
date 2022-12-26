<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";

const authStore = useAuthStore();
</script>

<template>
  <header>
    <h1>サンプルアプリ</h1>
    <div v-if="authStore.uid !== ''">
      <p>ユーザー:{{ authStore.uid }}</p>
    </div>
    <nav>
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
        <li><RouterLink to="/login">login</RouterLink></li>
        <li><RouterLink to="/signup">signup</RouterLink></li>
        <li><RouterLink to="/post">post</RouterLink></li>
      </ul>
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  height: 100px;
  background-color: bisque;
}
nav {
  text-align: center;
}
nav ul {
  margin: 0;
  padding: 0;
}
nav ul li {
  list-style: none;
  display: inline-block;
  width: 18%;
  min-width: 90px;
}
</style>
