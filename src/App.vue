<script setup lang="ts">
  import Menubar from 'primevue/menubar';
  import type { MenuItem } from 'primevue/menuitem';

  const links: MenuItem[] = [
    { label: 'Users', route: 'users' },
    { label: 'Posts', route: 'posts' },
    { label: 'Unpublished Posts', route: 'unpublished' },
  ];
</script>

<template>
  <main class="px-4 mx-auto my-4">
    <Menubar class="mb-8" :model="links">
      <template #start>
        <span class="text-2xl font-bold mr-4">Admin Panel</span>
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" :to="{ name: item.route }" v-bind="props.action">
          {{ item.label }}
        </router-link>
      </template>
    </Menubar>
    <router-view></router-view>
  </main>
</template>
