<script setup lang="ts">
import Menubar from 'primevue/menubar';

const links = [
  {label: "Users", route: "/"},
  {label: "Posts", route: "/posts"},
]
</script>

<template>
  <main class="px-4 mx-auto my-4">
    <Menubar class="mb-8" :model="links">
      <template #start>
        <span class=" text-2xl font-bold mr-4">Admin Panel</span>
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menubar>
    <router-view></router-view>
  </main>
</template>
