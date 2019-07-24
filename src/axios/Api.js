import axios from 'axios'

export default axios.create({
    baseURL: "http://libraryapi.muhammadrisano.online/",
    headers: { "authorization": "jangan-coba-coba" }
})