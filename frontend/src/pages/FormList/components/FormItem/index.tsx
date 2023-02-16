import React from "react";
import { Container, Title } from "./styles";
import { IFormList } from "@/contexts/FormContext/types";
import Options from "./Options";

const FormItem: React.FC<IFormList> = ({ id, title }) => {
    return (
            <Container>
                <Title>
                    {title}
                </Title>
                <Options id={id} />
            </Container>
    )
}

export default FormItem