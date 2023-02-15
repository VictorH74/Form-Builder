import { useParams } from "react-router-dom"
import { useQuery } from 'graphql-hooks';
import { RETRIEVE_FORM_QUERY } from "./graphql_operators";

const RetrievedForm = () => {
    const { formId } = useParams();
    const { loading, error, data } = useQuery(RETRIEVE_FORM_QUERY, { variables: { id: Number(formId) } })

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) return <div>Error</div>

    return (
        <div>{JSON.stringify(data.retrieveForm, null, 4)}</div>
    );
}

export default RetrievedForm;