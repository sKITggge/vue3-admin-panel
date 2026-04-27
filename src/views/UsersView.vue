<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import UsersWrapper from "../components/UsersWrapper.vue";
import {getUsers, LIMIT} from "../lib/api.ts";
import {ref, watchEffect} from "vue";
import type {User} from "../lib/types.ts";

const currentPage = ref<number>(1);
const totalPages = ref<number>(1);
const loading = ref<boolean>(false);
const usersData = ref<User[]>([]);

const loadUsers = async (page: number) => {
  loading.value = true;

  const resp = await getUsers(page)
  usersData.value = resp.data
  totalPages.value = resp.total

  loading.value = false;
}

const onPageChange = async (page: number) => {
  currentPage.value = page;
}

watchEffect(async () => {
  await loadUsers(currentPage.value)
})
</script>

<template>
  <h1 class="text-3xl font-semibold mb-6">Users</h1>
  <div v-if="loading" class="mx-auto flex justify-center items-center">
    <ProgressSpinner style="width: 50px; height: 50px" />
  </div>
  <UsersWrapper
      :users="usersData"
      :perPage="LIMIT"
      :totalPages="totalPages"
      @onPageChange="onPageChange"
  />
</template>
