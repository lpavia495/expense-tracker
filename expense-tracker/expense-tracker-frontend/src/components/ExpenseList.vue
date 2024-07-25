<template>
  <div class="expense-list">
    <button @click="goBack">Back</button>
    <h2>Expenses</h2>
    <form @submit.prevent="handleAddExpense">
      <div>
        <label for="description">Description:</label>
        <input type="text" v-model="description" required>
      </div>
      <div>
        <label for="amount">Amount:</label>
        <input type="number" v-model="amount" required>
      </div>
      <div>
        <label for="price">Price:</label>
        <input type="number" v-model="price" required>
      </div>
      <div>
        <label for="category">Category:</label>
        <input type="text" v-model="category" required>
      </div>
      <button type="submit">Add Expense</button>
    </form>

    <h3>Total Expenses: {{ totalExpenses }}</h3>
    <h3>Expenses by Category:</h3>
    <ul>
      <li v-for="(amount, category) in expensesByCategory" :key="category">
        {{ category }}: {{ amount.toFixed(2) }} <!-- Round to two decimal places -->
      </li>
    </ul>

    <h3>Monthly Threshold: {{ monthlyThreshold }}</h3>
    <form @submit.prevent="handleSetThreshold">
      <div>
        <label for="threshold">Set Monthly Threshold:</label>
        <input type="number" v-model="threshold" required>
      </div>
      <button type="submit">Set Threshold</button>
    </form>
    <h3>Remaining Amount: {{ remainingAmount }}</h3>
    <h3>Remaining Percentage: {{ remainingPercentage }}%</h3>

    <ul>
      <li v-for="expense in allExpenses" :key="expense._id">
        <div v-if="editingExpenseId === expense._id">
          <input type="text" v-model="editDescription" required>
          <input type="number" v-model="editAmount" required>
          <input type="number" v-model="editPrice" required>
          <input type="text" v-model="editCategory" required>
          <button @click="handleSaveEdit(expense._id)">Save</button>
          <button @click="handleCancelEdit">Cancel</button>
        </div>
        <div v-else>
          {{ expense.description }} - {{ expense.amount }} - {{ expense.price }} - {{ expense.category }}
          <button @click="handleEditExpense(expense)">Edit</button>
          <button @click="handleDeleteExpense(expense._id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ExpenseList',
  data() {
    return {
      description: '',
      amount: '',
      price: '',
      category: '',
      threshold: '', // Add this line
      editingExpenseId: null,
      editDescription: '',
      editAmount: '',
      editPrice: '',
      editCategory: ''
    };
  },
  computed: {
    ...mapGetters(['allExpenses', 'totalExpenses', 'expensesByCategory', 'monthlyThreshold', 'remainingAmount', 'remainingPercentage'])
  },
  methods: {
    ...mapActions(['fetchExpenses', 'createExpense', 'deleteExpense', 'editExpense', 'setMonthlyThreshold']),
    async handleAddExpense() {
      const expense = {
        description: this.description,
        amount: this.amount,
        price: this.price,
        category: this.category
      };
      await this.createExpense(expense);
      this.description = '';
      this.amount = '';
      this.price = '';
      this.category = '';
    },
    async handleDeleteExpense(id) {
      await this.deleteExpense(id);
    },
    handleEditExpense(expense) {
      this.editingExpenseId = expense._id;
      this.editDescription = expense.description;
      this.editAmount = expense.amount;
      this.editPrice = expense.price;
      this.editCategory = expense.category;
    },
    async handleSaveEdit(id) {
      const expense = {
        description: this.editDescription,
        amount: this.editAmount,
        price: this.editPrice,
        category: this.editCategory
      };
      await this.editExpense({ id, expense });
      this.editingExpenseId = null;
      this.editDescription = '';
      this.editAmount = '';
      this.editPrice = '';
      this.editCategory = '';
    },
    handleCancelEdit() {
      this.editingExpenseId = null;
      this.editDescription = '';
      this.editAmount = '';
      this.editPrice = '';
      this.editCategory = '';
    },
    async handleSetThreshold() {
      await this.setMonthlyThreshold(Number(this.threshold));
      this.threshold = '';
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.fetchExpenses();
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>
