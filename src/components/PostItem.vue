<script setup lang="ts">
  import Card from 'primevue/card';
  import type { Post } from '../lib/types.ts';

  defineProps<{ post: Post }>();
</script>

<template>
  <Card>
    <template #title>{{ post.title }}</template>
    <template #content>
      <p class="m-0 line-clamp-2">
        {{ post.body }}
      </p>
    </template>
  </Card>
</template>
