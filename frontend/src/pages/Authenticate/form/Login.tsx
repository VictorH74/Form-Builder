import React, { useState, useRef, useCallback, Fragment } from 'react';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import useTranslate from '@/hooks/UseTranslate';
import { SigninSchema } from '../validationSchemas';
import { signinFields } from '../data';
import { Actions, Form, Title } from '../styles';
import Fields from '../components/InputField';

interface Props {
    handleSubmit: (values: Record<string, string>) => void;
    fetchTokenLoading: boolean;
    handleFlip: () => void;
    titleTranslate: { login: string, signup: string };
}

const Login: React.FC<Props> = ({ handleSubmit, fetchTokenLoading, handleFlip, titleTranslate }) => {
    const translate = useTranslate({
        en: {
            formTitleLogin: "Login",
            formTitleSignup: "SignUp",
            formTitleCreated: "Account created!",
        },
        "pt-BR": {
            formTitleLogin: "Login",
            formTitleSignup: "Cadastrar",
            formTitleCreated: "Conta criada!",
        }
    })

    return (
        <Formik
            initialValues={{
                login: "",
                password: ""
            }}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={SigninSchema}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
            }) => (
                <Box
                    component={Form}
                    autoComplete="true"
                >
                    <Title children={titleTranslate.login} />
                    <Fields
                        fieldArray={signinFields}
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    <Actions>
                        <button type="submit" disabled={fetchTokenLoading} >
                            {titleTranslate.login}
                        </button>
                        <button type="button" onClick={handleFlip} disabled={fetchTokenLoading} >
                            {titleTranslate.signup}
                        </button>
                    </Actions>
                </Box>
            )}

        </Formik>
    )
}

export default Login;