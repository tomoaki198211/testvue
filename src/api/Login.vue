<script setup lang="ts">
import { reactive, computed } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";

const user = reactive({
  email: "",
  password: "",
});
const authStore = useAuthStore();
function onLogin(): void {
  const authStore = useAuthStore();
  const email = this.user.email;
  const password = this.user.password;
  authStore.login(email, password);
}
function onLogout(): void {
  const authStore = useAuthStore();
  authStore.logout();
}
</script>
<template>
  <div>
    <div>
      <label for="email"> Email </label>
      <input v-model="user.email" id="Email" type="text" placeholder="Email" />
    </div>
    <div>
      <label for="password"> Password </label>
      <input
        v-model="user.password"
        id="password"
        type="password"
        placeholder="******************"
      />
    </div>
    <button @click="onLogin()">Log In</button>
  </div>
  <div>
    <button @click="onLogout()">Log out</button>
  </div>
</template>
