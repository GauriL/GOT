<template>
  <div class="house-card">
    <h2 class="card-title">GOT HOUSES</h2>
    <hr class="line-below-name" />

    <ul class="house-list">
      <li v-for="house in houses" :key="house.slug">
        <router-link :to="{ name: 'house-profile', params: { slug: house.slug }}">
          <span class="white-text">{{ house.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.house-card {
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.line-below-name {
  border-top: 1px solid #ccc;
  margin-top: 8px;
}

.card-title {
  color: #fff;
}

.house-list {
  list-style: none;
  padding: 0;
}

.white-text {
  color: white;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface House {
  slug: string;
  name: string;
}

export default defineComponent({
  data() {
    return {
      houses: [] as House[], 
    };
  },
  mounted() {
    this.fetchHouses();
  },
  methods: {
    async fetchHouses() {
      try {
        const response = await axios.get<House[]>('https://api.gameofthronesquotes.xyz/v1/houses');
        this.houses = response.data;
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    },
  },
});
</script>
