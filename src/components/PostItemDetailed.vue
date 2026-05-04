<script setup lang="ts">
  import Card from 'primevue/card';
  import Button from 'primevue/button';
  import type { DetailedPost, ToastPayload } from '../lib/types.ts';
  import { deletePost } from '../lib/api.ts';
  import { ref } from 'vue';
  import { TOAST_MESSAGES } from '../lib/constants.ts';

  const { post } = defineProps<{ post: DetailedPost }>();
  const emit = defineEmits<{ onDeletePost: [obj: ToastPayload] }>();

  const isDeleting = ref<boolean>(false);

  const onDelete = async () => {
    try {
      isDeleting.value = true;
      await deletePost(post.id);
      emit('onDeletePost', {
        success: true,
        postId: post.id,
        message: TOAST_MESSAGES.DELETE_SUCCESS,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        emit('onDeletePost', {
          success: false,
          postId: post.id,
          message: TOAST_MESSAGES.DELETE_ERROR(error.message),
        });
      } else {
        emit('onDeletePost', {
          success: false,
          postId: post.id,
          message: TOAST_MESSAGES.DELETE_ERROR('Unknown error'),
        });
      }
    } finally {
      isDeleting.value = false;
    }
  };
</script>

<template>
  <Card>
    <template #title>
      <router-link :to="{ name: 'post', params: { id: post.id } }">
        {{ post.title }}
      </router-link>
    </template>
    <template #subtitle>
      {{ post.user.name }}
    </template>
    <template #content>
      <p class="m-0 line-clamp-2">
        {{ post.body }}
      </p>
    </template>
    <template #footer>
      <Button
        label="Delete"
        severity="secondary"
        variant="outlined"
        :disabled="isDeleting"
        @click="onDelete"
      />
    </template>
  </Card>
</template>
