import { ClientContext } from "graphql-hooks";
import { useContext } from "react";

const useGraphQlClient = () => useContext(ClientContext)

export default useGraphQlClient