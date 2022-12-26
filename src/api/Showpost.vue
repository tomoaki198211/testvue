<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import axios from "axios";
import { ref } from "vue";
interface Props {
  id: number;
}

const post = ref("");

const props = defineProps<Props>();
const authStore = useAuthStore();
(() => {
  console.log(authStore.uid);
  console.log(authStore.access_token);
  console.log(authStore.client);
  axios
    .get(`http://localhost:3000//posts/${props.id}`, {
      headers: {
        uid: authStore.uid,
        "access-token": authStore.access_token,
        client: authStore.client,
      },
    })
    .then((response) => {
      post.value = response.data;
    });
})();
</script>

<template>
  <div>
    <div>
      <label for="name"> name </label>
      <p>:{{ post ? post.user.name : "" }}</p>
    </div>
    <div>
      <label for="title"> title </label>
      <p>:{{ post.title }}</p>
    </div>
    <div>
      <label for="body"> body </label>
      <p>:{{ post.body }}</p>
    </div>
  </div>
</template>
