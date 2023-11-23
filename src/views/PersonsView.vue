<template>
  <div class="people-card">
    <h2 class="card-title">GOT MEMBERS</h2>
    <ul class="people-list">
      <li v-for="person in visiblePeople" :key="person.slug" class="person-item">
        <router-link :to="{ name: 'person-profile', params: { slug: person.slug }}" class="person-link">
          <h3>{{ person.name }}</h3>
        </router-link>
        <span class="house-name">{{ person.house?.name }}</span>
      </li>
    </ul>
    <button v-if="hasMore" @click="loadMore">Load More</button>
  </div>
</template>

<style scoped>
.people-card {
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.card-title {
  color: #fff;
}

.people-list {
  list-style-type: none;
  padding: 0;
}

.person-item {
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.person-link {
  text-decoration: none;
  color: #fff;
}

.house-name {
  color: #fff;
}

.load-more-button {
  background-color: #007BFF;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

interface Person {
  name: string;
  slug: string;
  house: {
    slug: string;
    name: string;
  }
  quotes: string[];
}

export default defineComponent({
  data() {
    return {
      people: [] as Person[],
      visiblePeople: [] as Person[],
      batchSize: 7,
      currentIndex: 0,
    };
  },
  computed: {
    hasMore() {
      return this.currentIndex < this.people.length;
    },
  },
  mounted() {
    this.fetchPeople();
  },
  methods: {
    async fetchPeople() {
      try {
        const response = await axios.get<Person[]>('https://api.gameofthronesquotes.xyz/v1/characters');
        this.people = response.data;
        this.loadMore();
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    },
    loadMore() {
      const endIndex = this.currentIndex + this.batchSize;
      this.visiblePeople = this.people.slice(0, endIndex);
      this.currentIndex = endIndex;
    },
  },
});
</script>
