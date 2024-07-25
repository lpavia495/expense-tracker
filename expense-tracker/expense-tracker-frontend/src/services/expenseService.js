import axios from 'axios';

const API_URL = 'http://localhost:5000/api/expenses/';

const getExpenses = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-auth-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''
      }
    });
    return response;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

const addExpense = async (expense) => {
  try {
    const response = await axios.post(API_URL, expense, {
      headers: {
        'x-auth-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''
      }
    });
    return response;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

const deleteExpense = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`, {
      headers: {
        'x-auth-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''
      }
    });
    return response;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, expense, {
      headers: {
        'x-auth-token': localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : ''
      }
    });
    return response;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export default {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense
};
