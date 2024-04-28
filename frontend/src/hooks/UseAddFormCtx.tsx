import { addFormCtx } from "@/contexts/AddFormContext";
import React from "react";

export default function useAddFormCtx() {
    const context = React.useContext(addFormCtx)
    if (!context) throw Error("useAddFormCtx  must be used within an AddFormProvider")

    return context;
}