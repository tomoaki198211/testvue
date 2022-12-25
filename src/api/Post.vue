<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";

const post = reactive({
  title: "",
  body: "",
  posts: [],
});
const uid = localStorage.getItem("uid");

function setPost(): void {
  axios
    .get("http://localhost:3000//posts")
    .then((response) => (this.post.posts = response.data));
}
function Post(): void {
  axios
    .post("http://localhost:3000//posts", {
      uid: this.uid,
      title: this.post.title,
      body: this.post.body,
    })
    .then((response) => this.setPost());
}
</script>

<template>
  <div>
    <ul>
      <li v-for="post in post.posts" :key="post.id">
        {{ post.title }}:{{ post.body }}
      </li>
    </ul>
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
  </div>
</template>
