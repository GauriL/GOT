<!-- QuotesView.vue -->
<template>
  <div class="quote-card">
    <h2 class="card-title">GOT QUOTES</h2>
    <hr class="line-below-name" />
    <div class="card-content">
      <p v-for="quote in quotes" :key="quote.id" class="quote-item">
        "{{ quote.sentence }}"
        <br />
        - {{ quote.character.name }}
      </p>
    </div>
    <button @click="fetchRandomQuotes">Get Random Quotes</button>
  </div>
</template>

<style scoped>
.quote-card {
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

.card-content {
  margin-top: 15px;
  color: #fff;
}

.quote-item {
  margin-bottom: 15px;
}

</style>

<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface Quote {
  id: number;
  character: {
    name: string;
  };
  sentence: string;
}

const quotes = ref<Quote[]>([]);

const fetchQuotes = async () => {
  const apiUrl = 'https://api.gameofthronesquotes.xyz/v1/random/5';

  try {
    const response = await axios.get(apiUrl);
    quotes.value = response.data;

    console.log('API Response:', response.data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
  }
};

const fetchRandomQuotes = () => {
  fetchQuotes();
};

onMounted(() => {
  fetchQuotes();
});
</script>
