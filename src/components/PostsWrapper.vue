<script setup lang="ts">
import Paginator, {type PageState} from 'primevue/paginator';
import type {DetailedPost} from "../lib/types.ts";
import PostItemDetailed from "./PostItemDetailed.vue";

interface UsersWrapperProps {
  posts: DetailedPost[];
  perPage: number;
  currentPage: number;
  totalPosts: number;
}

const {posts, perPage, currentPage, totalPosts} = defineProps<UsersWrapperProps>()
const emit = defineEmits<{ onPageChange: [page: number] }>()

const handlePageChange = (event: PageState) => {
  emit("onPageChange", event.page + 1);
}
</script>

<template>
  <div>
    <div class="flex flex-col gap-4">
      <PostItemDetailed
          v-for="post in posts"
          :key="post.id"
          :post="post"
      />
    </div>
    <Paginator
        :rows="perPage"
        :first="(currentPage -1) * perPage"
        :totalRecords="totalPosts"
        @page="handlePageChange"
    />
  </div>
</template>
