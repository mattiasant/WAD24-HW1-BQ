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
          @input="validatePassword"
          @blur="markPasswordTouched"
          required
      />

      <div v-if="passwordTouched && !isPasswordValid" class="error-messages">
        <p>The password is not valid:</p>
        <ul>
          <li v-for="(error, index) in passwordErrors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <button :disabled="!isPasswordValid" type="submit">Signup</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignupForm",
  data() {
    return {
      email: "",
      password: "",
      isPasswordValid: false,
      passwordErrors: [],
      passwordTouched: false, // Tracks whether the password field has been touched
    };
  },
  methods: {
    // Triggered when the password input is updated
    validatePassword() {
      if (this.password === "") {
        this.isPasswordValid = false;
        this.passwordErrors = [];
        return;
      }

      const errors = [];

      // Conditions for validation
      const lengthCondition = this.password.length >= 8 && this.password.length < 15;
      const startsWithUppercase = /^[A-Z]/.test(this.password);
      const includesOneUppercase = /[A-Z]/.test(this.password);
      const includesTwoLowercase = /[a-z].*[a-z]/.test(this.password);
      const includesOneNumber = /\d/.test(this.password);
      const includesUnderscore = /_/.test(this.password);

      // Check each condition and add errors
      if (!lengthCondition) {
        errors.push("Password must be between 8 and 15 characters.");
      }
      if (!startsWithUppercase) {
        errors.push("Password must start with an uppercase letter.");
      }
      if (!includesOneUppercase) {
        errors.push("Password must include at least one uppercase letter.");
      }
      if (!includesTwoLowercase) {
        errors.push("Password must include at least two lowercase letters.");
      }
      if (!includesOneNumber) {
        errors.push("Password must include at least one numeric value.");
      }
      if (!includesUnderscore) {
        errors.push('Password must include the character "_".');
      }

      // Update errors and validity status
      this.passwordErrors = errors;
      this.isPasswordValid = errors.length === 0;
    },

    // Triggered when the password field loses focus
    markPasswordTouched() {
      this.passwordTouched = true;
    },

    // Handles form submission
    handleSignup() {
      if (this.isPasswordValid) {
        alert(`Signup attempted with Email: ${this.email}`);
        // Add actual signup logic, to be added later I assume
      }
    },
  },
};
</script>

<style scoped>
.signup-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2em;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  margin-bottom: 15px;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 0.5em;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-messages {
  background-color: #ffe6e6;
  color: #ff0000;
  padding: 10px;
  border: 1px solid #ff0000;
  border-radius: 4px;
  margin-bottom: 15px;
}

.error-messages ul {
  margin: 0;
  padding-left: 20px;
}
</style>
