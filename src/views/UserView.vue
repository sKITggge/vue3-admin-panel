<script setup lang="ts">
  import { type RouteParams, useRoute } from 'vue-router';
  import type { User } from '../lib/types.ts';
  import { onMounted, ref } from 'vue';
  import { getUser } from '../lib/api.ts';
  import UserCardDetailed from '../components/UserCardDetailed.vue';
  import Button from 'primevue/button';
  import Message from 'primevue/message';
  import PostContainer from '../components/PostContainer.vue';

  const route = useRoute();
  const user = ref<User | null>(null);
  const loading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  onMounted(async () => {
    const params = route.params as RouteParams<'user'>;
    const userId = +params.id;
    if (isNaN(userId)) {
      errorMessage.value = 'Invalid user ID';
      return;
    }

    loading.value = true;
    try {
      user.value = await getUser(userId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        errorMessage.value = error.message;
      } else {
        errorMessage.value = 'An unknown error occurred';
      }
    } finally {
      loading.value = false;
    }
  });
</script>

<template>
  <div class="flex flex-col gap-4">
    <Button class="w-fit" as="router-link" to="/" label="Back to users" />

    <div>
      <Message v-if="loading" severity="info">Loading user info...</Message>
      <Message v-else-if="!!errorMessage || !user" severity="error">
        {{ errorMessage ?? 'Please try again later' }}
      </Message>
      <UserCardDetailed v-else :user="user" />
    </div>

    <PostContainer v-if="!!user" :user-id="user.id" />
  </div>
</template>
