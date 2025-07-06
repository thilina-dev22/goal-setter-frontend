import axios from 'axios'

const API_URL = 'http://localhost:5000/api/users'

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)
  return response.data
}

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData)
  return response.data
}

// Get user data
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL + '/me', config)
  return response.data
}



// Update user profile
const updateProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(`${API_URL}/me`, userData, config)
  return response.data
}

// Add to exported object
const authService = {
  register,
  login,
  getMe,
  updateProfile,
}


export default authService