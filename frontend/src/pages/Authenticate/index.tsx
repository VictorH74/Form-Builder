import React, { useState, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Actions, Container, CreatedAccount, Form, InputField, Title } from './styles';
import { useMutation } from 'graphql-hooks';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './graphql_operators';
import useGraphQlClient from '@/hooks/UseGraphQlClient';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Field,
    FieldProps,
} from 'formik';
import useTranslate from '@/hooks/UseTranslate';

interface MyFormValues {
    firstName: string;
}

interface FormData {
    name?: string;
    username?: string;
    email?: string;
    login?: string;
    password: string;
}

const Authentication: React.FC = () => {
    const translate = useTranslate({
        en: {
            formTitleLogin: "Login",
            formTitleSignup: "SignUp",
            formTitleCreated: "Account created!",
            usernameLabel: "Username",
            nameLabel: "Name",
            passwordLabel: "Password",
        },
        "pt-BR": {
            formTitleLogin: "Login",
            formTitleSignup: "Cadastrar",
            formTitleCreated: "Conta criada!",
            usernameLabel: "Nome de Usuário",
            nameLabel: "Nome",
            passwordLabel: "Senha",
        }
    })
    const [formData, setFormData] = useState<FormData>({
        login: '',
        password: '',
    });
    const [fetchToken, { loading: fetchTokenLoading }] = useMutation(LOGIN_MUTATION)
    const [registerUser, { loading: signUpLoading }] = useMutation(SIGNUP_MUTATION)
    const client = useGraphQlClient()
    const userCtx = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [flip, setFlip] = useState(false);
    const [createdAccount, setCreatedAccount] = useState(false)

    const cardRef = useRef<HTMLDivElement>(null);

    const props = useSpring({
        transform: `perspective(600px) rotateY(${flip ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        from: { transform: 'perspective(600px) rotateY(0deg)' },
    });

    const initialValues: MyFormValues = { firstName: '' };

    const handleFlip = () => {
        setFlip(!flip);
        setTimeout(() => setIsSignUp(!isSignUp), 200)
    };

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }, [formData])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!client || !userCtx) return alert("Erro ao tentar logar!");

        if (isSignUp) {
            let { name, username, email, phone, password } = formData;

            const res = await registerUser({
                variables: { name, username, email, phone, password }
            })

            if (res.error) {
                return alert(res.error.graphQLErrors[0].message)
            }

            setCreatedAccount(true);

            return;
        }

        let { login, password } = formData

        const res = await fetchToken({
            variables: { login, password }
        })

        if (res.error) {
            return alert(res.error.graphQLErrors[0].message)
        }

        let { token } = res.data.tokenAuth

        localStorage.setItem("form_builder-token", token);
        client.setHeader('Authorization', `JWT ${token}`)

        let user = await userCtx.fetchUser()
        userCtx.setUser(user.data.me)
    };

    if (userCtx?.authenticated) return <Navigate to="/my-forms/" replace />

    return (
        <Container>
            <animated.div
                className="card"
                style={props}
                ref={cardRef}
            >

                <Box
                    component={Form}
                    autoComplete="true"
                    onSubmit={handleSubmit}

                >
                    <Title children={
                        isSignUp ?
                            createdAccount ? translate("formTitleCreated") :
                                translate("formTitleSignup")
                            :
                            translate("formTitleLogin")} />

                    {
                        isSignUp ?
                            createdAccount ?
                                <CreatedAccount />
                                :
                                (
                                    <>
                                        <InputField id="name" label={translate("nameLabel")} variant="standard"
                                            name="name"
                                            value={formData.name || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputField id="username" label={translate("usernameLabel")} variant="standard"
                                            name="username"
                                            value={formData.username || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputField id="email" label="E-mail" variant="standard"
                                            name="email"
                                            type="email"
                                            value={formData.email || ""}
                                            onChange={handleChange}
                                            required
                                        />
                                    </>

                                ) : (
                                <InputField id="login" label="Login" variant="standard"
                                    name="login" onChange={handleChange}
                                    required value={formData.login || ""} />
                            )
                    }
                    {
                        !(createdAccount && isSignUp) && (
                            <InputField id="password" label={translate("passwordLabel")} variant="standard"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        )
                    }


                    <Actions>
                        {
                            createdAccount && isSignUp ? (
                                <button className="created" type="button" onClick={handleFlip} disabled={fetchTokenLoading || signUpLoading} >
                                    {isSignUp ? translate("formTitleLogin") : translate("formTitleSignup")}
                                </button>
                            )
                                :
                                (<>
                                    <button type="submit" disabled={fetchTokenLoading || signUpLoading} >
                                        {isSignUp ? translate("formTitleSignup") : translate("formTitleLogin")}
                                    </button>
                                    <button type="button" onClick={handleFlip} disabled={fetchTokenLoading || signUpLoading} >
                                        {isSignUp ? translate("formTitleLogin") : translate("formTitleSignup")}
                                    </button>
                                </>)
                        }
                    </Actions>

                </Box>


            </animated.div >
        </Container >
    );
};

export default Authentication;
