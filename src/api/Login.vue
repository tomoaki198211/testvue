<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";

const user = reactive({
  email: "",
  password: "",
  client: "",
  uid: "",
  access_token: "",
});

function Login(): void {
  axios
    .post("http://localhost:3000/auth/sign_in", {
      email: this.user.email,
      password: this.user.password,
    })
    .then((response) => {
      console.log("status:", response.status);
      localStorage.setItem("access-token", response.headers["access-token"]);
      localStorage.setItem("client", response.headers["client"]);
      localStorage.setItem("uid", response.headers["uid"]);
      this.user.access_token = response.headers["access-token"];
      this.user.client = response.headers["client"];
      this.user.uid = response.headers["uid"];
      console.log(this.user.access_token);
      console.log(this.user.client);
      console.log(this.user.uid);
    })
    .catch((err) => {
      console.log("err:", err);
    });
}
function Logout(): void {
  axios
    .delete("http://localhost:3000/auth/sign_out", {
      // test: { test: "test" },
      headers: {
        uid: this.user.uid,
        access_token: this.user.access_token,
        client: this.user.client,
      },
    })
    .then((response) => {
      console.log("status:", response.status);
      console.log("削除しました");
      this.user.access_token = "";
      this.user.client = "";
      this.user.uid = "";
    });
}
</script>
<template>
  <div v-if="user.client === ''">
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
    <button @click="Login()">Sign In</button>
  </div>
  <div v-if="user.client !== ''">
    <button @click="Logout()">Logout</button>
  </div>
</template>
