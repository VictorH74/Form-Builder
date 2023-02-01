import React, { useState, useEffect, useLayoutEffect } from "react";
import Header from "./components/Header";
import { Container, Content, ScrollTopBtn } from "./styles";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/Navbar";
import { useAuth } from "@/hooks/UseAuth";
import useLanguage from "@/hooks/UseLanguage";

const loginRequiredPath = [
    "my-forms",
]

const LoggedLayout = () => {
    const { language: lang } = useLanguage()
    const [showNav, setShowNav] = useState(false)
    const [showScrollTopBtn, setShowBtn] = useState(false)
    const userCtx = useAuth()

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

    if (loginRequiredPath.includes(location.pathname.split("/")[1]) && !userCtx?.authenticated) {
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
                {showScrollTopBtn && <ScrollTopBtn onClick={scrollToTop} children={lang === "en" ? "Top" : "Subir"} />}

            </Container>
        </>
    )
}

export default LoggedLayout;