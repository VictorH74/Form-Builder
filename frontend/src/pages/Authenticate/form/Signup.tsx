import React, { useState, useRef, useCallback, Fragment } from 'react';
import Box from '@mui/material/Box';
import { Formik } from 'formik';
import useTranslate from '@/hooks/UseTranslate';
import { SignupSchema } from '../validationSchemas';
import { signupFields } from '../data';
import { Actions, Form, Title } from '../styles';
import Fields from '../components/InputField';
import CreatedAccount from '../components/CreatedAccount';

interface Props {
    handleSubmit: (values: Record<string, string>, login: boolean) => void;
    createdAccount: boolean;
    signUpLoading: boolean;
    handleFlip: () => void;
    titleTranslate: { login: string, signup: string };
}

const Signup: React.FC<Props> = ({ handleSubmit, createdAccount, signUpLoading, handleFlip, titleTranslate }) => {
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
        <>
            {
                createdAccount ?
                    <CreatedAccount handleFlip={handleFlip} translate={titleTranslate.login} />
                    :
                    <Formik
                        initialValues={{
                            name: "",
                            username: "",
                            email: "",
                            password: ""
                        }}
                        onSubmit={(values) => handleSubmit(values, false)}
                        validationSchema={SignupSchema}
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
                                <Title children={titleTranslate.signup} />
                                <Fields
                                    fieldArray={signupFields}
                                    values={values}
                                    errors={errors}
                                    touched={touched}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />
                                <Actions>
                                    <button type="submit" disabled={signUpLoading} >
                                        {titleTranslate.signup}
                                    </button>
                                    <button type="button" onClick={handleFlip} disabled={signUpLoading} >
                                        {titleTranslate.login}
                                    </button>
                                </Actions>
                            </Box>
                        )}

                    </Formik>
            }
        </>
    )
}

export default Signup;