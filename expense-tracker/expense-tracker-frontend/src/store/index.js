import { createStore } from 'vuex';
import auth from './modules/auth';
import expenses from './modules/expenses';

export default createStore({
  modules: {
    auth,
    expenses
  }
});
