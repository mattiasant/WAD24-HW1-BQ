<template>
  <div>
    <Header />
    <div class="content-area">
      <div class="sidebox"></div>
      <div class="login">
        <div class="gray-box">
          <div class="green-box">
            <div class="login-container">
              <div class="login-box">
                <div class="input-group">
                  <label for="email">Email:</label>
                  <input type="email" id="email" v-model="email" placeholder="Enter your email" />
                </div>

                <div class="input-group">
                  <label for="password">Password:</label>
                  <input type="password" id="password" v-model="password" placeholder="Enter your password" />
                </div>

                <div class="button-group">
                  <button class="login-button" @click="handleLogin">Login</button>
                  <span class="or">or</span>
                  <router-link class="signup-button" to="/signup">Signup</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="sidebox"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/CompoHeader.vue';
import Footer from '@/components/CompoFooter.vue';

export default {
  name: 'LoginPage',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),

    handleLogin() {
      this.login({ email: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
}

.gray-box {
  background-color: #ddd; /* Gray color for the outer box */
  padding: 20px;
  border-radius: 15px;

}

.green-box {
  background-color: #c7f1d0; /* Light green color for the inner box */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-group input {
  border-radius: 8px;
  padding: 10px;
}

.input-group label {
  width: 100px; /* Adjust the width as needed */
  margin-right: 10px;
}

.button-group {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.login-button,
.signup-button {
  padding: 15px 20px;
  background-color: rgb(72, 145, 255);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover,
.signup-button:hover {
  background-color: rgb(12, 85, 180);
}

.or {
  margin: 0 10px;
}
</style>
