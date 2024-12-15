<template>
  <div class="main-page">
    <!-- Logout Button -->
    <button @click="logout" class="logout-button">Logout</button>

    <!-- Add Post Button -->
    <button @click="addPost" class="add-post-button">Add Post</button>

    <!-- List of Posts -->
    <div class="posts">
      <Post
          v-for="post in posts"
          :key="post.id"
          :postId="post.id"
          @click="goToPostDetails(post.id)"
      />
    </div>

    <!-- Reset All Likes Button -->
    <button @click="resetAllLikes" class="reset-button">Reset All Likes</button>

    <!-- Delete All Posts Button -->
    <button @click="deleteAllPosts" class="delete-all-button">Delete All Posts</button>
  </div>
</template>

<script>
import axios from 'axios';
import Post from './Post.vue';

export default {
  components: { Post },
  data() {
    return {
      posts: [], // Posts array to store the fetched posts
    };
  },
  created() {
    // Fetch posts when the component is created
    this.fetchPosts();
  },
  methods: {
    // Fetch posts from the backend
    fetchPosts() {
      axios.get('/api/posts') // Adjust the URL according to your backend route
          .then((response) => {
            this.posts = response.data; // Assuming the response returns the posts array
          })
          .catch((error) => {
            console.error('Error fetching posts:', error);
          });
    },

    // Handle the logout action
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },

    // Handle the add post action (redirect to Add Post page)
    addPost() {
      this.$router.push('/add-post');
    },

    // Handle resetting all likes in the Vuex store (assuming you've implemented this)
    resetAllLikes() {
      this.$store.commit('resetLikes');
    },

    // Handle navigating to post details page
    goToPostDetails(postId) {
      this.$router.push(`/post/${postId}`);
    },

    // Handle deleting all posts from the backend
    deleteAllPosts() {
      axios.delete('/api/posts') // Adjust according to your backend route
          .then(() => {
            // Reset the posts array in the component after deletion
            this.posts = [];
          })
          .catch((error) => {
            console.error('Error deleting posts:', error);
          });
    },
  },
};
</script>

<style scoped>
.logout-button,
.add-post-button,
.reset-button,
.delete-all-button {
  margin: 15px auto;
  display: block;
  padding: 12px 30px;
  background-color: #70606c;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}

.logout-button:hover,
.add-post-button:hover,
.reset-button:hover,
.delete-all-button:hover {
  background-color: #573d55;
}

.posts {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.posts .post {
  cursor: pointer;
}
</style>
