import { IFormList } from "../../../../pages/FormList/types";
import React from "react";
import { Button, ButtonContainer, Container, Title } from "./styles";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';

const FormItem: React.FC<IFormList> = ({ id, title }) => {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <ButtonContainer>
                {/* <Button t="view" children="Abrir" /> */}
                <VisibilityIcon color="primary" sx={{ fontSize: 30,  }} />
                <DeleteOutlineIcon sx={{ color: "#AC2B2E", fontSize: 30,  }} />
                {/* <Button t="delete" children="Excluir" /> */}
            </ButtonContainer>
        </Container>
    )
}

export default FormItem