import useTranslate from "@/hooks/UseTranslate";
import React from "react";
import { ErrorMsg, InputField } from "./styles";
import { FormikValues, FormikErrors, FormikTouched, FormikHandlers } from 'formik';
import { signinFields } from "../../data";


interface Props {
    fieldArray: (typeof signinFields)
    handleChange: FormikHandlers<string>['handleChange']
    handleBlur: FormikHandlers<string>['handleBlur']

    values: FormikValues
    errors: FormikErrors
    touched: FormikTouched
}

const Fields: React.FC<Props> = ({ fieldArray, handleChange, handleBlur, values, errors, touched }) => {
    const translate = useTranslate({
        en: {
            usernameLabel: "Username *",
            loginLabel: "Login *",
            emailLabel: "Email *",
            nameLabel: "Name *",
            passwordLabel: "Password *",
            min: "Too Short!",
            max: "Too Long!",
            required: "Required",
            emailRequired: "Invalid email",
        },
        "pt-BR": {
            usernameLabel: "Nome de Usuário *",
            loginLabel: "Login *",
            emailLabel: "Email *",
            nameLabel: "Nome *",
            passwordLabel: "Senha *",
            min: "Muito curto!",
            max: "Muito longo!",
            required: "Obrigatório",
            emailRequired: "email inválido",
        }
    })

    return (
        <>
            {
                fieldArray.map(field => (
                    <React.Fragment key={field.id}>
                        <InputField
                            variant="standard"
                            label={translate(field.label)}
                            id={field.id}
                            name={field.name}
                            type={field.type || "text"}
                            value={values[field.name as keyof typeof values]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {
                            errors[field.name as keyof typeof errors]
                            && touched[field.name as keyof typeof touched]
                            && (
                                <ErrorMsg children={translate(errors[field.name as keyof typeof errors])} />
                            )
                        }
                    </React.Fragment>
                ))
            }
        </>

    )
};

export default Fields