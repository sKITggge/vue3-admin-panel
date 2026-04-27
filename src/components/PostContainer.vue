<script setup lang="ts">
import Panel from "primevue/panel";
import {onMounted, ref} from "vue";
import type {Post} from "../lib/types.ts";
import PostItem from "./PostItem.vue";
import {getUserPosts} from "../lib/api.ts";

const { userId } = defineProps<{ userId: number }>();

const posts = ref<Post[]>([]);
const loading = ref<boolean>(false);

onMounted(async () => {
  loading.value = true;
  posts.value = await getUserPosts(userId)
  loading.value = false;
})
</script>

<template>
  <Panel>
    <h2 class="mb-4">User`s posts ({{ posts.length }})</h2>
    <div class="flex flex-col gap-2">
      <PostItem
          v-for="post in posts"
          :post="post"
          :key="post.id"
      />
    </div>
  </Panel>
</template>