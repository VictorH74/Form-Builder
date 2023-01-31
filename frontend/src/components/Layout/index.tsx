import React, { useState, useEffect, useLayoutEffect } from "react";
import Header from "./components/Header";
import { Container, Content, ScrollTopBtn } from "./styles";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";

const loginRequiredPath = [
    "my-forms",
]

const LoggedLayout = () => {
    const [showNav, setShowNav] = useState(false)
    const [showScrollTopBtn, setShowBtn] = useState(false)

    let location = useLocation();

    const toggleShow = () => setShowNav(!showNav)

    const handleScroll = () => {
        const scroll = document.documentElement.scrollTop
        setShowBtn(scroll > 500)
    }

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

    useEffect(() => {
        document.addEventListener("scroll", handleScroll)
        return () => document.removeEventListener("scroll", handleScroll)
    }, [])

    if (loginRequiredPath.includes(location.pathname.split("/")[1]) ) {
        return <Navigate to="authentication" replace />
    }

    return (
        <>
            <Header toggleShow={toggleShow} />
            <Container >
                {showNav && <NavBar />}
                <Content>
                    <Outlet />
                </Content>
                {showScrollTopBtn && <ScrollTopBtn onClick={scrollToTop} children="Subir" />}

            </Container>
        </>
    )
}

export default LoggedLayout;