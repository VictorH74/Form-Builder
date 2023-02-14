import useLanguage from "@/hooks/UseLanguage"

function Themes() {
    const { language: lang } = useLanguage()
    
    return (
        <h1>{lang === "en" ? "Themes" : "Temas"}</h1>
    )
}

export default Themes