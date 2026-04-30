<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import PostsWrapper from "../components/PostsWrapper.vue";
import {getPosts, LIMIT} from "../lib/api.ts";
import {onMounted, ref, watch} from "vue";
import debounce from 'lodash/debounce';
import type {DetailedPost} from "../lib/types.ts";

const currentPage = ref<number>(1);
const totalPosts = ref<number>(0);
const searchTerm = ref<string>("");
const loading = ref<boolean>(false);
const errorMessage = ref<string>("");
const postsData = ref<DetailedPost[]>([]);

const loadPosts = async (page: number, search: string) => {
  try {
    errorMessage.value = "";
    loading.value = true;

    const { data , total } = await getPosts(page, search)
    postsData.value = data
    totalPosts.value = total
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'An unknown error occurred';
    }
  } finally {
    loading.value = false;
  }
}

const debouncedSearch = debounce((search: string) => {
  currentPage.value = 1;
  loadPosts(1, search);
}, 300)

const onPageChange = (page: number) => {
  currentPage.value = page;
  loadPosts(currentPage.value, searchTerm.value);
}

onMounted(() => {
  loadPosts(currentPage.value, searchTerm.value);
});

watch(searchTerm, () => {
  debouncedSearch(searchTerm.value);
})
</script>

<template>
  <h1 class="text-3xl font-semibold mb-6">Posts</h1>
  <InputText
      class="w-full mb-4"
      size="small" type="text"
      placeholder="Search..."
      v-model="searchTerm"
  />
  <div v-if="loading" class="mx-auto flex justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" />
  </div>
  <Message v-else-if="!!errorMessage" severity="error">{{ errorMessage ?? "Please try again later" }}</Message>
  <Message v-else-if="postsData.length === 0" severity="info">No posts found</Message>
  <PostsWrapper
      v-else
      :posts="postsData"
      :perPage="LIMIT"
      :currentPage="currentPage"
      :totalPosts="totalPosts"
      @onPageChange="onPageChange"
  />
</template>
