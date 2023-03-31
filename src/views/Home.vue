<template>
  <div class="flex flex-col p-8">
    <input type="text" class="rounded border-2 border-gray-200 w-full" placeholder="Search for meals" />

    <div class="flex gap-1 mt-2 justify-center">
      <router-link v-for="letter of letters" to="/">
        {{ letter }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import store from '../store/';
const meals = computed(() => store.state.meals);
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
</script>
