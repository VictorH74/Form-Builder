import useLanguage from "@/hooks/UseLanguage"

function About() {
    const { language: lang } = useLanguage()

    return (
        <h1>{lang === "en" ? "About" : "Sobre"}</h1>
    )
}

export default About