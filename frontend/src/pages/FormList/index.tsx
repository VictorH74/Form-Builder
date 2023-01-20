import {
    QueryClient,
    QueryClientProvider,
    useQuery,
} from '@tanstack/react-query'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddLink, Container } from './styles'
import { formListData } from "./mockData"
import FormItem from './components/FormItem'
import { Link } from 'react-router-dom'


function FormList() {
    return (
        <Container>
            <AddLink to="add" ><AddCircleOutlineIcon sx={{ fontSize: 50 }} /></AddLink>
            {formListData.map(item => (<FormItem key={item.id} {...item} />))}
        </Container>

    )
}

export default FormList