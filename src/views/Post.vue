<template>
    <div class="post">
      <div class="post-header">
        <!-- Profile picture -->
        <div class="profile-pic-post">
          <img
            src="https://i.ibb.co/gdKTh5F/pfp.jpg"
            alt="Profile Picture"
            class="profile-icon-header"
          />
        </div>

        <!-- Author and Date -->
        <span class="author">{{ post.author }}</span>
        <span class="post-date">{{ formattedDate }}</span>
      </div>
  
      <!-- Post Content -->
      <p class="post-text">{{ post.content }}</p>
      <img
        v-if="post.image"
        :src="post.image"
        alt="Post Image"
        class="post-image"
      />
  
      <!-- Like Section -->
    <div class="like-section">
      <button @click="likePost" class="like-button">👍</button>
      <span class="likes-count">{{ post.likes }} likes</span>
    </div>
  </div>
</template>
  
  <script>
  export default {
    props: ['postId'],
    computed: {
      post() {
        return this.$store.state.posts.find(post => post.id === this.postId);
      },
      formattedDate() {
        return new Date(this.post.date).toDateString();
      }
    },
    methods: {
      likePost() {
        this.$store.commit('incrementLikes', this.postId);
      }
    }
  };
  </script>
  <style scoped>
  </style>
  