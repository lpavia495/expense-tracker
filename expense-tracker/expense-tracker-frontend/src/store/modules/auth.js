import authService from '../../services/authService';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  },
  clearUser(state) {
    state.user = null;
    localStorage.removeItem('user');
  }
};

const actions = {
  async register({ commit }, user) {
    const response = await authService.register(user.username, user.email, user.password);
    commit('setUser', response);
  },
  async login({ commit }, user) {
    console.log('Dispatching login with:', user); // Add this line
    const response = await authService.login(user.email, user.password);
    commit('setUser', response);
  },
  logout({ commit }) {
    authService.logout();
    commit('clearUser');
  }
};

const getters = {
  isAuthenticated: state => !!state.user,
  user: state => state.user
};

export default {
  state,
  mutations,
  actions,
  getters
};
