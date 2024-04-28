import useGraphQlClient from "@/hooks/UseGraphQlClient";
import { useManualQuery } from "graphql-hooks";
import React, { createContext, useState, useEffect } from "react";
import { ME } from "./graphql_operators";

interface IUser {
    name: string
    username: string
    email: string
    phone: string
}

interface IProviderValue {
    user?: IUser
    fetchUser: () => Promise<any>
    authenticated: boolean
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>
    logout: () => void
}

export const AuthContext = createContext<IProviderValue | null>(null)

export const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const client = useGraphQlClient()
    const [user, setUser] = useState<IUser | undefined>(undefined)
    const [fetchUser] = useManualQuery(ME)

    useEffect(() => {
        // prev 
        setUser({name: "Test", email: "test@test.com", phone: "999999999", username: "test@123"})
        return

        (async () => {
            let recoveredToken = localStorage.getItem("form_builder-token")

            if (!recoveredToken || !client) return;

            client.setHeader("Authorization", `JWT ${recoveredToken}`)
            let res = await fetchUser()
            setUser(res.data.me)
        })()
    }, [])

    const logout = () => {
        return // prev
        client?.setHeader("Authorization", null)
        setUser(undefined)
        localStorage.removeItem("form_builder-token")
    }

    const providerValue: IProviderValue = {
        user,
        fetchUser,
        // authenticated: !!user,
        authenticated: true, // temp
        setUser,
        logout
    }

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}
