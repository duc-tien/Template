import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'https://mqtt20231122093345day2211.azurewebsites.net/api/DataVali/'
})
export default axiosClient