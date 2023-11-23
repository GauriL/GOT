<!-- File name: PersonDetails.vue 

<template>
    <div>
      <h2>Person Details</h2>
      <strong>Name:</strong> {{ character.name }} <br>
      <strong>House:</strong> {{ character.house ? character.house.name : 'Unknown' }} <br>
      <strong>Quotes:</strong>
      <ul>
        <li v-for="quote in character.quotes" :key="quote">{{ quote }}</li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  // Fetch details when the component is mounted
  import { onMounted } from 'vue';
  onMounted(() => {
    // You need to replace 'some-slug' with the actual slug of the character
    fetchCharacterDetails('some-slug');
  });
  
  interface Character {
    name: string;
    slug: string;
    house: {
      slug: string;
      name: string;
    };
    quotes: string[];
  }
  
  const character = ref<Character>({ name: '', slug: '', house: { slug: '', name: '' }, quotes: [] });
  
  // Fetch the specific character details based on the slug
  const fetchCharacterDetails = async (slug: string) => {
    try {
      const response = await fetch(`https://api.gameofthronesquotes.xyz/v1/characters/${slug}`);
      const data = await response.json();
      character.value = data;
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };
  
  
  </script>
  -->