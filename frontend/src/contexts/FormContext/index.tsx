import React, { createContext, useState, useEffect } from "react"
import { CREATE_FORM_MUTATION, FORMS_QUERY } from "./graphql_operators";
import { IFormProvider, IFormList, IAddForm } from "./types";
import { useQuery, useMutation } from 'graphql-hooks';

export const FormContext = createContext<IFormProvider>(null);

const FormProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const { loading, error, data } = useQuery(FORMS_QUERY)
    const [createForm, { loading: creating }] = useMutation(CREATE_FORM_MUTATION)
    const [formList, setFormList] = useState<IFormList>([])

    useEffect(() => {
        if (data) setFormList(data.forms)
    }, [data])

    const addForm = async (form: IAddForm, callBack: () => void) => {
        const res = await createForm({
            variables: form
        })

        if (res.error) {
            return alert(res.error.graphQLErrors[0].message)
        }
        setFormList(prev => [...prev, res.data.createForm.form])
        callBack()
    }

    const providerValue: IFormProvider = {
        loading,
        creating,
        error,
        formList,
        addForm
    }

    return (
        <FormContext.Provider value={providerValue}>
            {children}
        </FormContext.Provider>
    )
}

export default FormProvider