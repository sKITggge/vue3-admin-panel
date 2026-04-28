<script setup lang="ts">
import Paginator, {type PageState} from 'primevue/paginator';
import UserCard from "./UserCard.vue";
import type {User} from "../lib/types.ts";

interface UsersWrapperProps {
  users: User[];
  perPage: number;
  currentPage: number;
  totalUsers: number;
}

const { users, perPage, currentPage, totalUsers} = defineProps<UsersWrapperProps>()
const emit = defineEmits<{ onPageChange: [page: number]}>()

const handlePageChange = (event: PageState) => {
  emit("onPageChange", event.page + 1);
}
</script>

<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      <UserCard v-for="user in users" :user="user" :key="user.id" />
    </div>
    <Paginator
        :rows="perPage"
        :first="(currentPage -1) * perPage"
        :totalRecords="totalUsers"
        @page="handlePageChange"
    />
  </div>
</template>
