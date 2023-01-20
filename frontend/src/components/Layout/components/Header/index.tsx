import React from "react";
import { Container, Menu } from "./styles";


const Header: React.FC<{ toggleShow: () => void }> = ({ toggleShow }) => {
    return (
        <Container>
            <Menu sx={{ fontSize: 35 }} onClick={toggleShow} />
        </Container>
    )
}

export default Header;