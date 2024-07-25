import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password
  });
};

const login = (email, password) => {
  console.log('Sending login request with:', { email, password }); // Add this line
  return axios.post(API_URL + 'login', {
    email,
    password
  }).then(response => {
    console.log('Login response:', response.data); // Add this line
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }).catch(error => {
    if (error.response) {
      console.error('Login error (response):', error.response.data);
    } else if (error.request) {
      console.error('Login error (request):', error.request);
    } else {
      console.error('Login error:', error.message);
    }
    throw error;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  register,
  login,
  logout
};
