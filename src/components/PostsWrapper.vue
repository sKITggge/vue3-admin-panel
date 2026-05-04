<script setup lang="ts">
  import Paginator, { type PageState } from 'primevue/paginator';
  import type { DetailedPost, ToastPayload } from '../lib/types.ts';
  import PostItemDetailed from './PostItemDetailed.vue';
  import Toast from 'primevue/toast';
  import { useToast } from 'primevue';

  interface UsersWrapperProps {
    posts: DetailedPost[];
    perPage: number;
    currentPage: number;
    totalPosts: number;
  }

  const { posts, perPage, currentPage, totalPosts } = defineProps<UsersWrapperProps>();
  const emit = defineEmits<{ onPageChange: [page: number]; handleDeletePost: [id: number] }>();

  const toast = useToast();

  const handlePageChange = (event: PageState) => {
    emit('onPageChange', event.page + 1);
  };

  const onDeletePost = (obj: ToastPayload) => {
    toast.add(obj.message);
    if (obj.success) {
      emit('handleDeletePost', obj.postId);
    }
  };
</script>

<template>
  <Toast />

  <div>
    <div class="flex flex-col gap-4">
      <PostItemDetailed
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @onDeletePost="onDeletePost"
      />
    </div>
    <Paginator
      :rows="perPage"
      :first="(currentPage - 1) * perPage"
      :totalRecords="totalPosts"
      @page="handlePageChange"
    />
  </div>
</template>
