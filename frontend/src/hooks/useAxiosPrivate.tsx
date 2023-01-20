import { useEffect } from "react"
import { apiPrivate } from "../api/axios"


export const UseApiPrivate = () => {
    useEffect(() => {
        apiPrivate.interceptors.response()
    }, [])
}

export default UseApiPrivate