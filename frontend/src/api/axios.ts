import axios from "axios";

const API_URL = process.env.API_URL || "http://localhost:8000/api"

export const api = axios.create({
    baseURL: API_URL
})

export const apiPrivate = axios.create({
    baseURL: API_URL
})