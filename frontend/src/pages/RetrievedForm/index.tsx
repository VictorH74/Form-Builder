import { useParams } from "react-router-dom"
import { useQuery } from 'graphql-hooks';
import { RETRIEVE_FORM_QUERY } from "./graphql_operators";
import Loading from "@/components/Loading";
import { FormContainer, QuestionsContainer } from "./styles";
import FillBlank from "./components/FillBlank";
import MultipleChoice from "./components/MutipleChoice";

const RetrievedForm = () => {
    const { formId } = useParams();
    const { loading, error, data } = useQuery(RETRIEVE_FORM_QUERY, { variables: { id: Number(formId) } })
    const { id, title, questions } = data?.retrieveForm || { id: "", title: "", questions: [] }

    if (loading) {
        return <Loading />
    }

    if (error) return <div>Error</div>

    return (
        <div>
            <FormContainer>
                <h2 className="title">{title}</h2>
                <QuestionsContainer>
                    {
                        questions.map((q, i) =>
                            q.type === "TX" ?
                                (<FillBlank
                                    key={q.questionNumber}
                                    index={i}
                                    question={q}
                                />)
                                : q.type === "MC" ?
                                    (<MultipleChoice
                                        key={q.questionNumber}
                                        index={i}
                                        question={q}
                                    />)
                                    : "")
                    }
                </QuestionsContainer>
            </FormContainer>
        </div>
    );
}

export default RetrievedForm;