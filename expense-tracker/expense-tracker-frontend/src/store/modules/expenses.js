import expenseService from '../../services/expenseService';

const state = {
  expenses: [],
  monthlyThreshold: 10000 // Default value, can be changed by the user
};

const mutations = {
  setExpenses(state, expenses) {
    state.expenses = expenses;
  },
  addExpense(state, expense) {
    state.expenses.push(expense);
  },
  removeExpense(state, id) {
    state.expenses = state.expenses.filter(expense => expense._id !== id);
  },
  updateExpense(state, updatedExpense) {
    const index = state.expenses.findIndex(expense => expense._id === updatedExpense._id);
    if (index !== -1) {
      state.expenses.splice(index, 1, updatedExpense);
    }
  },
  setMonthlyThreshold(state, threshold) {
    state.monthlyThreshold = threshold;
  }
};

const actions = {
  async fetchExpenses({ commit }) {
    const response = await expenseService.getExpenses();
    commit('setExpenses', response.data);
  },
  async createExpense({ commit }, expense) {
    const response = await expenseService.addExpense(expense);
    commit('addExpense', response.data);
  },
  async deleteExpense({ commit }, id) {
    await expenseService.deleteExpense(id);
    commit('removeExpense', id);
  },
  async editExpense({ commit }, { id, expense }) {
    const response = await expenseService.updateExpense(id, expense);
    commit('updateExpense', response.data);
  },
  setMonthlyThreshold({ commit }, threshold) {
    commit('setMonthlyThreshold', threshold);
  }
};

const getters = {
  allExpenses: state => state.expenses,
  totalExpenses: state => {
    const total = state.expenses.reduce((total, expense) => total + (expense.price * expense.amount), 0);
    return parseFloat(total.toFixed(2)); // Round to two decimal places
  },
  expensesByCategory: state => {
    return state.expenses.reduce((acc, expense) => {
      const total = expense.price * expense.amount;
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += total;
      return acc;
    }, {});
  },
  monthlyThreshold: state => state.monthlyThreshold,
  remainingAmount: (state, getters) => {
    const remaining = state.monthlyThreshold - getters.totalExpenses;
    return parseFloat(remaining.toFixed(2)); // Round to two decimal places
  },
  remainingPercentage: (state, getters) => {
    const percentage = (getters.remainingAmount / state.monthlyThreshold) * 100;
    return parseFloat(percentage.toFixed(2)); // Round to two decimal places
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
