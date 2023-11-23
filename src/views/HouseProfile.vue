<template>
  <div>
    <div v-if="house" class="house-card">
      <h3 class="house-name">{{ house.name }}</h3>
      <hr class="line-below-name" />
      <ul class="member-list">
        <li v-for="memberName in memberNames" :key="memberName">{{ memberName }}</li>
      </ul>
      <br>
      <button @click="fetchHouse">Refresh House</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>
.house-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.house-name {
  font-size: 1.5em;
  color: #fff; 
  margin-bottom: 8px; /* Add margin below house name */
}

.line-below-name {
  border-top: 1px solid #ccc;
  margin-top: 8px;
  margin-bottom: 8px; /* Add margin below the line */
}

.member-list {
  list-style: none;
  padding: 0;
  color: #fff;
}
</style>

<script lang="ts">
import axios from 'axios';

interface Member {
  name: string;
  slug: string;
}

interface House {
  name: string;
  members: Member[];
}

export default {
  data() {
    return {
      house: {
        name: '',
        members: [],
      } as House,
      memberNames: [] as string[], 
    };
  },
  mounted() {
    this.fetchHouse();
  },
  methods: {
    async fetchHouse() {
      const slug = this.$route.params.slug;

      try {
        const response = await axios.get(`https://api.gameofthronesquotes.xyz/v1/house/${slug}`);
        
        // Log all member names
        console.log('response',response);
        this.memberNames = response.data[0].members.map((member: Member) => member.name);

        // Log the data for the house
        console.log(`Data for house with slug ${slug}:`, response.data[0]);
        
        // Log the members object
        console.log(`Members for house with slug ${slug}:`, response.data[0].members);
        
        this.house = response.data[0];
      } catch (error) {
        console.error('Error fetching house details:', error);
      }
    },
  },
};
</script>
