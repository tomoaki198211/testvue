<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>
<template>
  <h2>Not Found</h2>
  <p>アクセスしたページは存在しません。</p>
  <div><RouterLink :to="{ name: 'home' }">ホーム</RouterLink>に戻る</div>
</template>
