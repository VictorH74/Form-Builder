import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddLink, Container } from './styles'
import FormItem from './components/FormItem'
import { FORMS_QUERY } from './graphql_operators';
import { useQuery } from 'graphql-hooks';


function FormList() {
    const { loading, error, data } = useQuery(FORMS_QUERY)

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) return <div>Error</div>

    return (
        <Container>
            <AddLink to="add" ><AddCircleOutlineIcon sx={{ fontSize: 50, color: "dodgerblue" }} /></AddLink>
            {data.forms.map(form => (<FormItem key={form.id} {...form} />))}
        </Container>
    )
}

export default FormList