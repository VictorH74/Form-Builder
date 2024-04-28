import { FormContext } from "@/contexts/FormContext";
import { useContext } from "react";

export default function useForm() {
    const context = useContext(FormContext)

    if (!context) throw Error("useForm must be used within a FormProvider")

    return context;
};