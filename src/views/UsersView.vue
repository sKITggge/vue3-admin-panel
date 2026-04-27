<script setup lang="ts">
import type {User} from "../lib/types.ts";
import UserCard from "../components/UserCard.vue";

const userData: User = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 px-4">
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
    <UserCard :user="userData"/>
  </div>
</template>
