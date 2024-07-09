import axios from "axios"

const BACKEND_URL = "http://localhost:8787/api/v1";

export const axiosInstance = axios.create({
    baseURL: BACKEND_URL
})

export const endpoints = {
    user: {
        signup: '/user/signup',
        signin: '/user/signin',
    },

    blog: {
        create: '/blog',
        update: '/blog',
        get: '/blog/bulk',
        getById: '/blog/:id'
    }
}