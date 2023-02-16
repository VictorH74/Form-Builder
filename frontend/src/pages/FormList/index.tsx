import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddLink, Container } from './styles'
import FormItem from './components/FormItem'
import useForm from '@/hooks/UseForm';
import Loading from '@/components/Loading';


function FormList() {
    const { loading, error, formList } = useForm()

    if (loading) {
        return <Loading />
    }

    if (error) return <div>Error</div>

    return (
        <Container>
            <AddLink to="add" ><AddCircleOutlineIcon sx={{ fontSize: 50, color: "dodgerblue" }} /></AddLink>
            {formList.map(form => (<FormItem key={form.id} {...form} />))}
        </Container>
    )
}

export default FormList