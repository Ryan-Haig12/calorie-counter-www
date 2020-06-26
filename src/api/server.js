import axios from 'axios'

export default axios.create({
    baseURL: `http://localhost:4000`,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
})