<script setup lang="ts">
import InputText from 'primevue/inputtext';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import UsersWrapper from "../components/UsersWrapper.vue";
import {getUsers, LIMIT} from "../lib/api.ts";
import {ref, watch} from "vue";
import type {User} from "../lib/types.ts";

const currentPage = ref<number>(1);
const totalUsers = ref<number>(1);
const searchTerm = ref<string>("");
const loading = ref<boolean>(false);
const errorMessage = ref<string>("");
const usersData = ref<User[] | null>(null);

const loadUsers = async (page: number, search: string) => {
  try {
    loading.value = true;

    const { data , total } = await getUsers(page, search)
    usersData.value = data
    totalUsers.value = total
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
}

const onPageChange = async (page: number) => {
  currentPage.value = page;
}

watch([currentPage, searchTerm], () => {
  loadUsers(currentPage.value, searchTerm.value)
}, {
  immediate: true,
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
  <Message v-else-if="!!errorMessage || !usersData" severity="error">
    {{ errorMessage ?? "Please try again later" }}
  </Message>
  <UsersWrapper
      v-else
      :users="usersData"
      :perPage="+LIMIT"
      :currentPage="currentPage"
      :totalUsers="totalUsers"
      @onPageChange="onPageChange"
  />
</template>
