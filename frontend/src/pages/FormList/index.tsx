import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddLink, Container } from './styles'
import { formListData } from "./mockData"
import FormItem from './components/FormItem'


function FormList() {
    return (
        <Container>
            <AddLink to="add" ><AddCircleOutlineIcon sx={{ fontSize: 50 }} /></AddLink>
            {formListData.map(item => (<FormItem key={item.id} {...item} />))}
        </Container>

    )
}

export default FormList