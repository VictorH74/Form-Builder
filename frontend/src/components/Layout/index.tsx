import React, { useState } from "react";
import Header from "./components/Header";
import { Container, Content } from "./styles";
import { Outlet } from "react-router-dom";
import NavBar from "./components/Navbar";

const LoggedLayout = () => {
    const [showNav, setShowNav] = useState(false)

    const toggleShow = () => setShowNav(!showNav)

    return (
        <>
            <Header toggleShow={toggleShow} />
            <Container>
                {showNav && <NavBar />}
                <Content>
                    <Outlet />
                </Content>

            </Container>
        </>
    )
}

export default LoggedLayout;