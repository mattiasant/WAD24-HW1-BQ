<template>
    <header>
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/signup">Sign Up</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  import { RouterLink } from 'vue-router';
  
  export default {
    name: 'Header',
    components: {
      RouterLink,
    },
  };
  </script>
  
  <style scoped>
  </style>
  
  