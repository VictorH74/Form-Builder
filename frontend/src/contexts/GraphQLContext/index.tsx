/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const API_URL = import.meta.env.VITE_API_URL

const client = new GraphQLClient({
    url: `${API_URL}/graphql`,
})

interface IGraphQLClientProps {
    children: JSX.Element
}

const GraphQLClientProvider: React.FC<IGraphQLClientProps> = ({ children }) => {
    return (
        <ClientContext.Provider value={client} >
            {children}
        </ClientContext.Provider>
    )
}

export default GraphQLClientProvider