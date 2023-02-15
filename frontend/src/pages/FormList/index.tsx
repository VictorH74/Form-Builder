import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddLink, Container } from './styles'
import FormItem from './components/FormItem'
import useForm from '@/hooks/UseForm';


function FormList() {
    const { loading, error, formList } = useForm()

    if (loading) {
        return <div>Loading...</div>
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