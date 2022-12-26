<script setup lang="ts">
import { reactive, computed } from "vue";
import { useAuthStore } from "../stores/auth";

const user = reactive({
  email: "",
  password: "",
});

const authStore = useAuthStore();
async function onSignup() {
  const authStore = useAuthStore();
  const email = this.user.email;
  const password = this.user.password;
  await authStore.signup(email, password);
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
    <button @click="onSignup()">Sign up</button>
  </div>
</template>
