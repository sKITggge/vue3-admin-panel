<script setup lang="ts">
import Paginator, {type PageState} from 'primevue/paginator';
import UserCard from "./UserCard.vue";
import type {User} from "../lib/types.ts";
import {computed, ref} from "vue";

interface UsersWrapperProps {
  users: User[];
  perPage: number;
}

const { users, perPage} = defineProps<UsersWrapperProps>()

const firstPageItemIdx = ref<number>(0);

const paginatedUsers = computed(() => users.slice(firstPageItemIdx.value, firstPageItemIdx.value + perPage))

const handlePageChange = (event: PageState) => {
  firstPageItemIdx.value = event.page * perPage;
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      <UserCard v-for="user in paginatedUsers" :user="user" :key="user.id" />
    </div>
    <Paginator :rows="perPage" :totalRecords="users.length" @page="handlePageChange" />
  </div>
</template>
