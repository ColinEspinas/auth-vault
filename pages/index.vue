<script setup lang="ts">
const { data: users } = useFetch('/api/users')
</script>

<template>
  <div>Users:</div>
  <ul>
    <li v-for="user in users" :key="user.id">
      {{ user.firstName }} {{ user.lastName }}
    </li>
  </ul>
</template>
