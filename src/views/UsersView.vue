<script setup lang="ts">
import type {User} from "../lib/types.ts";
import UsersWrapper from "../components/UsersWrapper.vue";

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

const usersData = new Array(10).fill(userData).map((user, index) => ({...user, id: index, name: user.name + " " + index}));
</script>

<template>
  <h1 class="text-3xl font-semibold mb-6">Users</h1>
  <UsersWrapper :users="usersData" :per-page="4" />
</template>
