import { LanguageCtx } from "@/contexts/LanguageContext";
import { useContext } from "react";

export default function useLanguage() {
    const context = useContext(LanguageCtx)

    if (!context) throw Error ("useLanguage must be used within a LanguageProvider")

    return context;
}
