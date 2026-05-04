<script setup lang="ts">
  import { type RouteParams, useRoute } from 'vue-router';
  import type { DetailedPost } from '../lib/types.ts';
  import { onMounted, ref } from 'vue';
  import { getPost } from '../lib/api.ts';
  import Button from 'primevue/button';
  import Message from 'primevue/message';
  import PostItemDetailed from '../components/PostItemDetailed.vue';

  const route = useRoute();
  const post = ref<DetailedPost | null>(null);
  const loading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  onMounted(async () => {
    const params = route.params as RouteParams<'user'>;
    const postId = +params.id;
    if (isNaN(postId)) {
      errorMessage.value = 'Invalid post ID';
      return;
    }

    loading.value = true;
    try {
      post.value = await getPost(postId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = 'An unknown error occurred';
      }
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4">
      <Button class="w-fit" as="router-link" :to="{ name: 'posts' }" label="Back to posts" />
      <Button class="w-fit" as="router-link" :to="{ name: 'user', params: { id: post?.userId } }" label="To author page" />
    </div>

    <Message v-if="loading" severity="info">Loading user info...</Message>
    <Message v-else-if="!!errorMessage || !post" severity="error">
      {{ errorMessage ?? 'Please try again later' }}
    </Message>
    <PostItemDetailed
      v-else
      :show-controls="false"
      :post="post"
    />
  </div>
</template>
