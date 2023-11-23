<!--File name: GotCharactes.vue 

<template>
  <div>
    <button @click="fetchData">Fetch Data</button>

    <div v-if="apiData.length > 0">
      <h2>API Response:</h2>
      <pre>{{ apiData }}</pre>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';

const apiData = ref([]);

async function fetchData() {
  try {
    const response = await fetch('https://api.gameofthronesquotes.xyz/v1/characters');
    const data = await response.json();
    apiData.value = data;

    // Log the response to the console
    console.log('API Response:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
</script>

-->