<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import UsersWrapper from "../components/UsersWrapper.vue";
import {getUsers, LIMIT} from "../lib/api.ts";
import {onMounted, ref, watch} from "vue";
import debounce from 'lodash/debounce';
import type {User} from "../lib/types.ts";

const currentPage = ref<number>(1);
const totalUsers = ref<number>(0);
const searchTerm = ref<string>("");
const loading = ref<boolean>(false);
const errorMessage = ref<string>("");
const usersData = ref<User[]>([]);

const loadUsers = async (page: number, search: string) => {
  try {
    errorMessage.value = "";
    loading.value = true;

    const { data , total } = await getUsers(page, search)
    usersData.value = data
    totalUsers.value = total
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
  loadUsers(1, search);
}, 300)

const onPageChange = (page: number) => {
  currentPage.value = page;
  loadUsers(currentPage.value, searchTerm.value);
}

onMounted(() => {
  loadUsers(currentPage.value, searchTerm.value);
});

watch(searchTerm, () => {
  debouncedSearch(searchTerm.value);
})
</script>

<template>
  <h1 class="text-3xl font-semibold mb-6">Users</h1>
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
  <Message v-else-if="usersData.length === 0" severity="info">No users found</Message>
  <UsersWrapper
      v-else
      :users="usersData"
      :perPage="LIMIT"
      :currentPage="currentPage"
      :totalUsers="totalUsers"
      @onPageChange="onPageChange"
  />
</template>
