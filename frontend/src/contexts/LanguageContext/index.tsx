import React, { createContext, useState, useEffect } from "react";

export const LanguageCtx = createContext({
    language: "en",
    changeLanguage: (lang: string) => { }
})

export const LanguageProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [language, setLang] = useState("en")

    useEffect(() => {
        let language = localStorage.getItem("form_builder-language")
        setLang(language || window.navigator.language)
    }, [])

    const changeLanguage = (lang: string) => {
        setLang(lang)
    }

    const providerValue = {
        language,
        changeLanguage
    }

    return (
        <LanguageCtx.Provider value={providerValue}>
            {children}
        </LanguageCtx.Provider>
    )
}
