<script setup lang="ts">
  import { ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Textarea from 'primevue/textarea';
  import Button from 'primevue/button';
  import Panel from 'primevue/panel';
  import type { PostCreate } from '../lib/types.ts';

  const emit = defineEmits<{ onAddPost: [post: PostCreate] }>();

  const formData = ref({
    title: '',
    body: '',
  });

  const handleSubmit = () => {
    const title = formData.value.title;
    const body = formData.value.body;

    if (!title || !body) return;

    emit('onAddPost', {
      title,
      body,
      userId: 1,
    });

    formData.value.title = '';
    formData.value.body = '';
  };
</script>

<template>
  <Panel toggleable>
    <template #header>
      <span>Add New Post</span>
    </template>
    <form @submit.prevent="handleSubmit" class="p-fluid">
      <div class="field mb-4">
        <label for="title" class="block font-medium mb-1">Title</label>
        <InputText id="title" v-model.trim="formData.title" type="text" required class="w-full" />
      </div>
      <div class="field mb-4">
        <label for="body" class="block font-medium mb-1">Content</label>
        <Textarea id="body" v-model.trim="formData.body" rows="4" required class="w-full" />
      </div>
      <Button type="submit" label="Add Post" severity="primary" class="w-full" />
    </form>
  </Panel>
</template>
