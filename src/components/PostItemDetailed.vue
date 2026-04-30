<script setup lang="ts">
import Card from "primevue/card";
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import {useToast} from "primevue";
import type {DetailedPost} from "../lib/types.ts";
import {deletePost} from "../lib/api.ts";
import {ref} from "vue";

const {post} = defineProps<{ post: DetailedPost }>()

const isDeleting = ref<boolean>(false);
const toast = useToast();

const onDelete = async () => {
  try {
    isDeleting.value = true;
    await deletePost(post.id)
    toast.add({severity: 'info', summary: 'Info', detail: 'Post Deleted', life: 1500});
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.add({severity: 'error', summary: 'Error', detail: error.message, life: 1500});
    } else {
      toast.add({severity: 'error', summary: 'Error', detail: 'Unknown error', life: 1500});
    }
  } finally {
    isDeleting.value = false;
  }
}
</script>

<template>
  <Toast/>

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