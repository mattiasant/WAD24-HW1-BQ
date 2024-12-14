<template>
    <div class="login-form">
      <form @submit.prevent="handleLogin">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Email"
          required
        />
  
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Password"
          required
        />
  
        <div class="buttons">
          <button type="submit" class="login-button">Login</button>
          <span>Or</span>
          <button type="button" class="signup-button" @click="goToSignup">Signup</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: "",
        password: "",
      };
    },
    methods: {
        handleLogin() {
      if (this.email && this.password) {
        localStorage.setItem('authToken', 'jwt-token');
        this.$router.push('/');
      } else {
        alert('Invalid credentials');
      }
    },
      goToSignup() {
        this.$router.push("/signup");
      },
    },
  };
  </script>
  
  <style scoped>
  span {
    margin: 0 20px;
  }

  input {
  margin-bottom: 15px;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
.buttons {
    margin: 0 auto;
}
button {
width: 80px;
}
  </style>
  
  
  