<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
    <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      console.log('Login form submitted with:', this.email, this.password); // Add this line
      try {
        await this.login({ email: this.email, password: this.password });
        console.log('Login successful'); // Add this line
        this.$router.push('/');
      } catch (err) {
        console.error('Login failed:', err); // Add this line
        this.error = 'Invalid credentials';
      }
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
