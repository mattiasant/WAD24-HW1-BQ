<template>
  <div class="topnav">
    <div class="nav-links">
      <router-link to="/" class="nav-item" :class="{ active: $route.path === '/' }">Home</router-link>
      <span>|</span> <!-- Add a separator between links -->
      <router-link to="/contact-us" class="nav-item" :class="{ active: $route.path === '/contactus' }">Contacts</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompoHeader'
};
</script>

<style scoped>
.topnav {
  background-color: #868686;
  text-align: center; /*Aligns the contents of the topnav to the center */ 
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  padding: 0;
  border-radius: 10px;
}

.header-title {
  color: black; 
  margin: 10px 0; 
}

.nav-links {
  display: inline-block; 
}
.nav-links span {
  margin: 0 10px; /* Adjust the spacing of the separator */
  color: black;
}

.nav-item {
  display: inline-block;
  color: black;
  padding: 14px 16px;
  text-decoration: none;
  font-size: x-large;
}

.nav-item:hover {
  background-color: #ddd;
  color: black;
}

.nav-item.active {
  font-weight: bold;
  color: #383b38; 
}
</style>
