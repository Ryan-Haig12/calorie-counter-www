import axios from 'axios'

const authToken = localStorage.getItem('cc-userJWT')

export default axios.create({
    baseURL: `http://localhost:4000`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ authToken }`
    }
})