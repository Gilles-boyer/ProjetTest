import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',   // exemple : "https://api.mon-cse.com"
  timeout: 10000,                          // timeout par défaut
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api