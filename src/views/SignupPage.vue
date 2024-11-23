<template>
    <div>
      <h1>Signup Page</h1>
      <form>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" />
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />
        
        <button type="submit">Signup</button>
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
  