<template>
  <div>
    <div v-if="person" class="person-card">
      <h3 class="person-name">{{ person.name }}</h3>
      <hr class="line-below-name" /><br>
      <p class="white-text">House: {{ person.house.name }}</p>
      <div class="quotes-container">
        <p class="quotes-title">Quotes:</p>
        <ul class="quote-list">
          <li v-for="quote in person.quotes" :key="quote">{{ quote }}</li>
        </ul>
      </div>
      <br>
      <button @click="fetchRandomQuotes">Get Random Quotes</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.white-text {
  color: white;
}

.person-card {
  border: 1px solid #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.person-name {
  font-size: 1.5em;
  color: #fff; 
}

.line-below-name {
  border-top: 1px solid #fff;
  margin-top: 8px;
}

.quotes-container {
  margin-top: 16px;
  
}

.quotes-title {
  font-weight: bold;
  color: #fff;
}

.quote-list {
  list-style: none;
  padding: 0;
  color: #fff;

}
</style>

<script lang="ts">
import axios from 'axios';

interface Person {
  name: string;
  slug: string;
  house: House;
  quotes: string[];
}

interface House {
  name: string;
  slug: string;
}

export default {
  data() {
    return {
      person: null as Person | null,
    };
  },
  mounted() {
    this.fetchPerson();
  },
  methods: {
    async fetchPerson() {
      const slug = this.$route.params.slug;
      try {
        const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/character/${slug}`);
        this.person = {
          name: response.data[0].name,
          slug: response.data[0].slug,
          house: {
            slug: response.data[0].house.slug,
            name: response.data[0].house.name,
          },
          quotes: response.data[0].quotes,
        };
        console.log('Data person', this.person);
      } catch (error) {
        console.error('Error fetching person details:', error);
      }
    },
    async fetchRandomQuotes() {
  try {
    const response = await axios.get('https://api.gameofthronesquotes.xyz/v1/random/5');
    const randomQuotes = response.data.map((quote: { sentence: string }) => quote.sentence);

    // Ensure this.person is not null before updating quotes
    if (this.person) {
      this.person.quotes = randomQuotes;
      console.log('Random Quotes:', this.person.quotes);
    } else {
      console.error('Person object is null. Cannot update quotes.');
    }
  } catch (error) {
    console.error('Error fetching random quotes:', error);
  }
},

  },
};
</script>
