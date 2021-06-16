import axios from 'axios'

const options= {
  baseURL : process.env.NODE_ENV === 'development' ? 'http://localhost:5500' : 'https://movie-tracker-back.herokuapp.com/'
}

const api = axios.create(options)

export default api