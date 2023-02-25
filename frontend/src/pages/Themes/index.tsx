import useLanguage from "@/hooks/UseLanguage"
import PreView from "./components/PreView"
import { themeColors } from "./data"
import { ThemeList } from "./styles"

function Themes() {
    const { language: lang } = useLanguage()

    return (
        <>
            <h1>{lang === "en" ? "Themes" : "Temas"}</h1>
            <ThemeList>
                {themeColors.map( theme => (<PreView bg={theme.bg} />))}
            </ThemeList>
        </>

    )
}

export default Themes