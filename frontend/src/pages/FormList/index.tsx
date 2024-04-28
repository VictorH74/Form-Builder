import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddLink, Container } from './styles'
import FormItem from './components/FormItem'
import useForm from '@/hooks/UseForm';
import Loading from '@/components/Loading';
import { EmptyFormListContainer } from '../Home/styles';
import useTranslate from '@/hooks/UseTranslate';


const EmptyFormList = () => {
    const translate = useTranslate({
        "pt-BR": { message: "Você não possui nenhum formulário no momento." },
        "en": { message: "You dont't have any form at the moment." }
    })

    return (
        <EmptyFormListContainer>
            <h2>{translate("message")}</h2>
        </EmptyFormListContainer>
    )
}


function FormList() {
    const { loading, error, formList } = useForm()

    if (loading) {
        return <Loading />
    }

    if (error) return <div>Error</div>

    return (
        <Container>
            <AddLink to="add" ><AddCircleOutlineIcon sx={{ fontSize: 50, color: "dodgerblue" }} /></AddLink>
            {
                formList.length === 0 ? <EmptyFormList />
                    : formList.map(form => (<FormItem key={form.id} {...form} />))
            }
        </Container>
    )
}

export default FormList