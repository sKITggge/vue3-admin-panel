<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import UsersWrapper from "../components/UsersWrapper.vue";
import {getUsers, LIMIT} from "../lib/api.ts";
import {ref, watch} from "vue";
import type {User} from "../lib/types.ts";

const currentPage = ref<number>(1);
const totalUsers = ref<number>(1);
const loading = ref<boolean>(false);
const errorMessage = ref<string>("");
const usersData = ref<User[] | null>(null);

const loadUsers = async (page: number) => {
  try {
    loading.value = true;

    const { data , total } = await getUsers(page)
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

watch([currentPage], () => {
  loadUsers(currentPage.value)
}, {
  immediate: true,
})
</script>

<template>
  <h1 class="text-3xl font-semibold mb-6">Users</h1>
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
      :totalUsers="totalUsers"
      @onPageChange="onPageChange"
  />
</template>
