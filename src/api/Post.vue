<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { useAuthStore } from "../stores/auth";
import { RouterLink } from "vue-router";

const post = reactive({
  title: "",
  body: "",
  image: "",
  posts: [],
});

const authStore = useAuthStore();

setPost();

//インデックス表示用
async function setPost(): Promise<void> {
  await axios
    .get("http://localhost:3000//posts", {
      headers: {
        uid: authStore.uid,
        "access-token": authStore.access_token,
        client: authStore.client,
      },
    })
    .then((response) => {
      post.posts = response.data;
      console.log(response.data);
    });
}

//画像を含めて送信する場合はFormDataを使用する。
//headerにはmaultipart/form-dataを指定する
async function Post(): Promise<void> {
  const formData = new FormData();
  formData.append("post[title]", this.post.title);
  formData.append("post[body]", this.post.body);
  formData.append("post[image]", post.image);
  const config = {
    headers: {
      uid: authStore.uid,
      "access-token": authStore.access_token,
      client: authStore.client,
      "content-type": "multipart/form-data",
    },
  };
  await axios
    .post("http://localhost:3000//posts", formData, config)
    .then((response) => {
      this.setPost();
      console.log("status:", response.status);
    });
}

//ファイル名の変更にはchangeを使う。
function setImage(e) {
  e.preventDefault();
  const picture = e.target.files[0];
  post.image = picture;
  console.log(post.image);
}

//削除用
async function Delete_Post(post_id): Promise<void> {
  console.log(authStore.uid);
  console.log(authStore.access_token);
  console.log(authStore.client);
  await axios
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
    <div>
      <input type="file" @change="setImage" ref="image" />
    </div>
    <button @click="Post()">投稿する</button>
    <ul>
      <li v-for="post in post.posts" :key="post.id">
        <RouterLink v-bind:to="{ name: 'post_show', params: { id: post.id } }">
          {{ post.user.name }}:{{ post.user_id }}:{{ post.title }}:{{
            post.body
          }}
          <div v-if="post.image.url !== null">
            <img :src="post.image.url" />
          </div>
        </RouterLink>
        <button @click="Delete_Post(post.id)">削除する</button>
      </li>
    </ul>
  </div>
</template>
