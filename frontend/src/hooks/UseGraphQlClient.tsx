import { ClientContext } from "graphql-hooks";
import { useContext } from "react";

export default function useGraphQlClient() {
    const context = useContext(ClientContext)

    if (!context) throw Error("useGraphQlClient must be used within a GraphQLProvider")

        return context
}