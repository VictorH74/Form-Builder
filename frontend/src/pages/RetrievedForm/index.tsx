import { useParams } from "react-router-dom"
import { useQuery } from 'graphql-hooks';
import { RETRIEVE_FORM_QUERY } from "./graphql_operators";
import Loading from "@/components/Loading";
import { Container, DeleteBtn, FormContainer, QuestionsContainer } from "./styles";
import FillBlank from "./components/FillBlank";
import MultipleChoice from "./components/MutipleChoice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Backward } from "@/global/styles/globalStyles";
import useForm from "@/hooks/UseForm";

const RetrievedForm = () => {
    const { formId } = useParams();
    const { loading, error, data } = useQuery(RETRIEVE_FORM_QUERY, { variables: { id: Number(formId) } })
    const { id, title, questions } = data?.retrieveForm || { id: "", title: "", questions: [] }
    const { deleteForm } = useForm()

    const handleDelete = async () => {
        deleteForm(id)
    }

    if (loading) {
        return <Loading />
    }

    if (error) return <div>Error</div>

    return (
        <Container>
            <Backward to="/my-forms" >
                <ArrowBackIcon sx={{ fontSize: 50, color: "dodgerblue" }} />
            </Backward>
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
            <DeleteBtn children="Delete" />
        </Container>
    );
}

export default RetrievedForm;