<template>
  <div class="post-details">
    <!-- Back Button -->
    <button @click="goBack" class="back-btn">Back</button>

    <!-- Display Post Details -->
    <div v-if="post">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
      <p class="date">Created At: {{ formatDate(post.createdAt) }}</p>
    </div>
    <div v-else>
      <p>Loading post details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id'], // Get post ID from the route parameter
  data() {
    return {
      post: null, // To store the fetched post details
    };
  },
  methods: {
    // Fetch post details using the post ID
    async fetchPostDetails() {
      try {
        const response = await axios.get(`/api/posts/${this.id}`);
        this.post = response.data;
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    },
    // Go back to the Home page
    goBack() {
      this.$router.push('/');
    },
    // Format date to a readable format
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  mounted() {
    this.fetchPostDetails(); // Fetch post when the component is mounted
  },
};
</script>

<style scoped>
.post-details {
  padding: 2rem;
  font-family: Arial, sans-serif;
  text-align: center;
}
.back-btn {
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
h1 {
  font-size: 2rem;
  color: #333;
}
p {
  font-size: 1.2rem;
  color: #555;
}
.date {
  font-style: italic;
  color: #999;
}
</style>
