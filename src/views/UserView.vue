<script setup lang="ts">
import {useRoute} from "vue-router";
import type {User} from "../lib/types.ts";
import {onMounted, ref} from "vue";
import {getUser} from "../lib/api.ts";
import UserCardDetailed from "../components/UserCardDetailed.vue";
import Button from 'primevue/button';
import Message from 'primevue/message';
import PostContainer from "../components/PostContainer.vue";

const route = useRoute()
const user = ref<User | null>(null);
const loading = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

async function loadUser(id: number): Promise<User> {
  loading.value = true;
  try {
    return await getUser(id);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  try {
    user.value = await loadUser(+route.params.id);
  } catch (error: any) {
    errorMessage.value = error.message;
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button
        class="w-fit"
        as="router-link"
        to="/"
        label="Back to users"
    />

    <div>
      <Message v-if="loading" severity="info">Loading user info...</Message>
      <Message v-else-if="!!errorMessage || !user" severity="error">
        {{ errorMessage ?? "Please try again later" }}
      </Message>
      <UserCardDetailed v-else :user="user"/>
    </div>

    <PostContainer v-if="!!user" :user-id="user?.id"/>
  </div>
</template>