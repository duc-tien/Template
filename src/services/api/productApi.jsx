import axiosClient from "./axiosClient"

const productApi = {
    getAll: (add) => {
        const url = `${add}`
        return axiosClient.get(url)
    }}

export default productApi