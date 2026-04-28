<script setup lang="ts">
import type {User} from "../lib/types.ts";
import Card from 'primevue/card';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import Divider from 'primevue/divider';
import {computed} from "vue";

const {user} = defineProps<{ user: User }>();

const formattedLocation = computed(() => {
  return [
    user.address.street,
    user.address.suite,
    user.address.city,
    user.address.zipcode
  ].filter(Boolean).join(", ");
})
</script>

<template>
  <Card class="overflow-hidden rounded-xl group">
    <template #header>
      <div
          class="h-2 bg-gradient-to-r from-blue-600 to-purple-600 transition-opacity duration-200 group-hover:opacity-70"></div>
    </template>

    <template #title>
      <div class="flex items-center gap-3">
        <Avatar
            :label="user.name?.[0]?.toUpperCase() ?? ''"
            shape="circle"
            size="large"
            class="w-12 h-12 bg-blue-500 text-white font-bold shadow-sm"
        />
        <span class="text-xl font-semibold text-gray-800">{{ user.name }}</span>
      </div>
    </template>

    <template #subtitle>
      <Badge
          severity="secondary"
          class="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
      >
        @{{ user.username }}
      </Badge>
    </template>

    <template #content>
      <Divider class="my-3"/>
      <ul class="grid grid-cols-2 space-y-0 divide-y divide-gray-100">
        <li class="flex items-center gap-3 py-2 text-gray-600">
          <i class="pi pi-envelope w-5 text-blue-500"></i>
          <span class="text-sm">{{ user.email }}</span>
        </li>
        <li class="flex items-center gap-3 py-2 text-gray-600">
          <i class="pi pi-phone w-5 text-blue-500"></i>
          <span class="text-sm">{{ user.phone }}</span>
        </li>
        <li class="flex items-center gap-3 py-2 text-gray-600">
          <i class="pi pi-building w-5 text-blue-500"></i>
          <span class="text-sm">{{ user.company.name }}</span>
        </li>
        <li class="flex items-center gap-3 py-2 text-gray-600">
          <i class="pi pi-map-marker w-5 text-blue-500"></i>
          <span class="text-sm">
            {{ formattedLocation }}
          </span>
        </li>
        <li class="flex items-center gap-3 py-2 text-gray-600">
          <i class="pi pi-globe w-5 text-blue-500"></i>
          <span class="text-sm">{{ user.website }}</span>
        </li>
      </ul>
    </template>
  </Card>
</template>