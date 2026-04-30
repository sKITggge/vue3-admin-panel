<script setup lang="ts">
import Paginator, {type PageState} from 'primevue/paginator';
import type {DetailedPost, ToastPayload} from "../lib/types.ts";
import PostItemDetailed from "./PostItemDetailed.vue";
import Toast from "primevue/toast";
import {useToast} from "primevue";
import {ref} from "vue";

interface UsersWrapperProps {
  posts: DetailedPost[];
  perPage: number;
  currentPage: number;
  totalPosts: number;
}

const {posts, perPage, currentPage, totalPosts} = defineProps<UsersWrapperProps>()
const emit = defineEmits<{ onPageChange: [page: number] }>()

const deletedPosts = ref<number[]>([]);
const toast = useToast();

const handlePageChange = (event: PageState) => {
  emit("onPageChange", event.page + 1);
}

const onToast = (obj: ToastPayload) => {
  toast.add(obj.message);
  if (obj.success) {
    deletedPosts.value.push(obj.postId);
  }
}
</script>

<template>
  <Toast/>

  <div>
    <div class="flex flex-col gap-4">
      <div
          v-for="post in posts"
          :key="post.id"
      >
        <PostItemDetailed
            v-if="!deletedPosts.includes(post.id)"
            :post="post"
            @onToast="onToast"
        />
      </div>
    </div>
    <Paginator
        :rows="perPage"
        :first="(currentPage -1) * perPage"
        :totalRecords="totalPosts"
        @page="handlePageChange"
    />
  </div>
</template>
