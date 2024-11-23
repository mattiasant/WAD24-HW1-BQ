<template>
  <div class="main-page">
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
      return this.$store.state.posts; //Fetch posts
    }
  },
  methods: {
    resetAllLikes() {
      this.$store.commit('resetLikes'); //Reset likes
    }
  }
};
</script>

<style scoped>
</style>

  