<template>
  <div class="main-page">
    <button @click="logout" class="logout-button">Logout</button>
    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :postId="post.id" />
    </div>
    <button @click="resetAllLikes" class="reset-button">Reset All Likes</button>
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
  components: { Post },
  computed: {
    posts() {
      return this.$store.state.posts;
    },
  },
  methods: {
    resetAllLikes() {
      this.$store.commit('resetLikes');
    },
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.logout-button {
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

.logout-button:hover {
  background-color: #573d55;
}
</style>


  