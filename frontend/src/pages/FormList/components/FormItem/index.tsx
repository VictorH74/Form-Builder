import React from "react";
import { ButtonContainer, Container, Title } from "./styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";
import { IFormList } from "@/contexts/FormContext/types";
import useForm from "@/hooks/UseForm";

const FormItem: React.FC<IFormList> = ({ id, title }) => {
    const { deleteForm } = useForm()

    const handleDelete = async () => {
        deleteForm(id)
    }

    return (
        <Container>
            <Title>
                {title}
            </Title>
            <ButtonContainer>
                <Link to={`${id}`} >
                    <VisibilityIcon sx={{ color: "dodgerblue", fontSize: 30, cursor: "pointer" }} />
                </Link>
                <DeleteOutlineIcon sx={{ color: "#AC2B2E", fontSize: 30, cursor: "pointer" }} onClick={handleDelete} />
            </ButtonContainer>
        </Container>
    )
}

export default FormItem