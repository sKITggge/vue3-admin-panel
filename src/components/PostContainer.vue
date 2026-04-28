<script setup lang="ts">
import Panel from "primevue/panel";
import Message from 'primevue/message';
import {onMounted, ref} from "vue";
import type {Post} from "../lib/types.ts";
import PostItem from "./PostItem.vue";
import {getUserPosts} from "../lib/api.ts";

const { userId } = defineProps<{ userId: number }>();

const posts = ref<Post[]>([]);
const loading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    posts.value = await getUserPosts(userId)
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'An unknown error occurred';
    }
  } finally {
    loading.value = false;
  }
})
</script>

<template>
  <Panel>
    <h2 class="mb-4">User`s posts <span v-if="!!posts.length">({{ posts.length }})</span></h2>
    <Message v-if="!!errorMessage">{{ errorMessage }}</Message>
    <div v-else class="flex flex-col gap-2">
      <PostItem
          v-for="post in posts"
          :post="post"
          :key="post.id"
      />
    </div>
  </Panel>
</template>