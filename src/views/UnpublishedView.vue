<script setup lang="ts">
  import { usePostStore } from '../stores/PostStore.ts';
  import PostItemDetailed from '../components/PostItemDetailed.vue';
  import type { Post, ToastPayload } from '../lib/types.ts';
  import PostForm from '../components/PostForm.vue';

  const { posts, addPost, removePost } = usePostStore();

  const onDeletePost = (obj: ToastPayload) => {
    if (obj.success) {
      removePost(obj.postId);
    }
  };

  const onAddPost = (newPost: Partial<Post>) => {
    addPost(newPost);
  };
</script>

<template>
  <h1 class="text-3xl font-semibold mb-6">Unpublished Posts</h1>

  <PostForm @onAddPost="onAddPost" class="mb-8" />

  <div class="flex flex-col gap-4">
    <PostItemDetailed
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :showControls="true"
      @onDeletePost="onDeletePost"
    />
  </div>
</template>
