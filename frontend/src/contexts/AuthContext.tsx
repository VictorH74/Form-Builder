import React, { createContext, useState, useEffect } from "react";

interface IUser {
    name: string
    username: string
    email: string
    phone: string
}

interface IProviderValue {
    user?: IUser
}

const AuthContext = createContext<IProviderValue | undefined>(undefined)

const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [user, setUser] = useState<IUser | undefined>(undefined)

    useEffect(() => {
        const init = async () => {
            
        }

    }, [])

    const providerValue: IProviderValue = {
        user
    }

    return (
        <AuthContext.Provider value={providerValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
