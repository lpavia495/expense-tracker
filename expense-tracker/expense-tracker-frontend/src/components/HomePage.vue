<template>
  <div class="home">
    <h1>Welcome to Expense Tracker</h1>
    <p v-if="!isAuthenticated">
      <router-link to="/login">Login</router-link> or
      <router-link to="/register">Register</router-link> to start tracking your expenses.
    </p>
    <p v-else>
      You are logged in. Start tracking your expenses. 
      <router-link to="/expenses">Go to Expenses</router-link> <!-- Add this line -->
      <button @click="handleLogout">Logout</button>
    </p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
