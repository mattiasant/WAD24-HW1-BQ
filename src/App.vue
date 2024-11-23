<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Post from './components/Post.vue';

export default {
  components: {
    Header,
    Footer,
    Post,
  },
};
</script>

<style>
@import './assets/styles.css';
</style>


  