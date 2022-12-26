<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { RouterLink } from "vue-router";

const post = reactive({
  title: "",
  body: "",
  posts: [],
});

const authStore = useAuthStore();

function setPost(): void {
  axios
    .get("http://localhost:3000//posts", {
      headers: {
        uid: authStore.uid,
        "access-token": authStore.access_token,
        client: authStore.client,
      },
    })
    .then((response) => (this.post.posts = response.data));
}

function Post(): void {
  console.log(authStore.uid);
  console.log(authStore.access_token);
  console.log(authStore.client);
  axios
    .post("http://localhost:3000//posts", {
      uid: authStore.uid,
      "access-token": authStore.access_token,
      client: authStore.client,
      title: this.post.title,
      body: this.post.body,
    })
    .then((response) => {
      this.setPost();
      console.log("status:", response.status);
    });
}

function Delete_Post(post_id): void {
  console.log(authStore.uid);
  console.log(authStore.access_token);
  console.log(authStore.client);
  axios
    .delete(`http://localhost:3000//posts/${post_id}`, {
      headers: {
        uid: authStore.uid,
        "access-token": authStore.access_token,
        client: authStore.client,
      },
    })
    .then((response) => {
      this.setPost();
      console.log("status:", response.status);
    });
}
</script>

<template>
  <div>
    <div>
      <label for="title"> title </label>
      <input v-model="post.title" id="title" type="text" placeholder="title" />
    </div>
    <div>
      <label for="body"> body </label>
      <input
        v-model="post.body"
        id="title"
        type="textarea"
        placeholder="body"
      />
    </div>
    <button @click="Post()">投稿する</button>
    <ul>
      <li v-for="post in post.posts" :key="post.id">
        <RouterLink v-bind:to="{ name: 'post_show', params: { id: post.id } }">
          {{ post.user.name }}:{{ post.user_id }}:{{ post.title }}:{{
            post.body
          }}
        </RouterLink>
        <button @click="Delete_Post(post.id)">削除する</button>
      </li>
    </ul>
  </div>
</template>
