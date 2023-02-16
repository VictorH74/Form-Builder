import { useParams } from "react-router-dom"
import { useQuery } from 'graphql-hooks';
import { RETRIEVE_FORM_QUERY } from "./graphql_operators";
import Loading from "@/components/Loading";

const RetrievedForm = () => {
    const { formId } = useParams();
    const { loading, error, data } = useQuery(RETRIEVE_FORM_QUERY, { variables: { id: Number(formId) } })

    if (loading) {
        return <Loading />
    }

    if (error) return <div>Error</div>

    return (
        <div>{JSON.stringify(data.retrieveForm, null, 4)}</div>
    );
}

export default RetrievedForm;