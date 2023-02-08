/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { GraphQLClient, ClientContext } from 'graphql-hooks'

const API_PORT = '8001'

const client = new GraphQLClient({
    url: `http://api:${API_PORT}/graphql`,
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