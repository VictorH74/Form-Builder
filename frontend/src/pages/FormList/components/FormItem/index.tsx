import { IFormList } from "../../../../pages/FormList/types";
import React from "react";
import { ButtonContainer, Container, Title } from "./styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FormItem: React.FC<IFormList> = ({ id, title }) => {

    const viewForm = async () => {
        console.log("", id);
    }

    const deleteForm = async () => {
        console.log("", id);
    }

    return (
        <Container>
            <Title>
                {title}
            </Title>
            <ButtonContainer>
                <VisibilityIcon sx={{ color: "dodgerblue", fontSize: 30, cursor: "pointer"  }} onClick={viewForm} />
                <DeleteOutlineIcon sx={{ color: "#AC2B2E", fontSize: 30, cursor: "pointer"  }} onClick={deleteForm} />
            </ButtonContainer>
        </Container>
    )
}

export default FormItem