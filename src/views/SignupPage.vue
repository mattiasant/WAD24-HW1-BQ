<template>
    <div>
      <form>
        
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" name="email" />
        
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" name="password" />
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "SignupPage",
  };
  </script>
  
  <style>
  </style>
  