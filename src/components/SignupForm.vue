<template>
  <div class="signup-form">
    <form @submit.prevent="handleSignup">
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

      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
import "@/assets/styles.css"; 

export default {
  name: "SignupForm",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleSignup() {
      alert(`Signup attempted with Email: ${this.email}`);
    },
  },
};
</script>