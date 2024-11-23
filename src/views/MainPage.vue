<template>
  <div class="main-page">
    <h1>Main Page</h1>
    <button @click="resetAllLikes" class="reset-button">Reset Likes</button>
    <div class="posts">
      <Post v-for="post in posts" :key="post.id" :postId="post.id" />
    </div>
  </div>
</template>

<script>
import Post from './Post.vue';

export default {
  components: { Post },
  computed: {
    posts() {
      return this.$store.state.posts; //Fetch posts from Vuex store
    }
  },
  methods: {
    resetAllLikes() {
      this.$store.commit('resetLikes'); //Reset likes in Vuex store
    }
  }
};
</script>

<style scoped>
</style>

  