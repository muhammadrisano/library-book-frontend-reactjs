import axios from 'axios'

export default axios.create({
    baseURL: "http://localhost:4000/",
    headers: { "authorization": "jangan-coba-coba" }
})

