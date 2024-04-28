import React, { useState, useRef, useCallback, memo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Container } from './styles';
import { useMutation } from 'graphql-hooks';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './graphql_operators';
import useGraphQlClient from '@/hooks/UseGraphQlClient';
import useAuth from '@/hooks/UseAuth';
import { Navigate } from 'react-router-dom';
import useTranslate from '@/hooks/UseTranslate';
import Signup from './form/Signup';
import Login from './form/Login';

const Authentication: React.FC = () => {
    const [fetchToken, { loading: fetchTokenLoading }] = useMutation(LOGIN_MUTATION)
    const [registerUser, { loading: signUpLoading }] = useMutation(SIGNUP_MUTATION)
    const client = useGraphQlClient()
    const userCtx = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [flip, setFlip] = useState(false);
    const [createdAccount, setCreatedAccount] = useState(false)

    const cardRef = useRef<HTMLDivElement>(null);

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

    const props = useSpring({
        transform: `perspective(600px) rotateY(${flip ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        from: { transform: 'perspective(600px) rotateY(0deg)' },
    });

    const titleTranslate = {
        login: translate("formTitleLogin"),
        signup: translate("formTitleSignup")
    }

    const handleFlip = useCallback(() => {
        setFlip(!flip);
        setTimeout(() => setIsSignUp(!isSignUp), 200)
    }, [flip, isSignUp]);

    const handleSubmit = useCallback(async (values: Record<string, string>, login = true) => {
        if (!client || !userCtx) return alert("Erro ao tentar logar!");

        // CREATE ACCOUNT-------------------------------
        if (!login) {
            const res = await registerUser({ variables: values })

            if (res.error) {
                return alert(res.error.graphQLErrors[0].message)
            }

            setCreatedAccount(res.data.createUser.created);

            return;
        }

        // LOGIN----------------------------------------
        const res = await fetchToken({ variables: values })

        if (res.error) {
            return alert(res.error.graphQLErrors[0].message)
        }

        let { token } = res.data.tokenAuth

        localStorage.setItem("form_builder-token", token);
        client.setHeader('Authorization', `JWT ${token}`)

        let user = await userCtx.fetchUser()
        userCtx.setUser(user.data.me)
    }, []);

    if (userCtx?.authenticated) return <Navigate to="/my-forms/" replace />

    return (
        <Container>
            <animated.div
                className="card"
                style={props}
                ref={cardRef}
            >
                {
                    isSignUp ?
                        <Signup
                            handleSubmit={handleSubmit}
                            createdAccount={createdAccount}
                            signUpLoading={signUpLoading}
                            handleFlip={handleFlip}
                            titleTranslate={titleTranslate}
                        />
                        :
                        <Login
                            handleSubmit={handleSubmit}
                            fetchTokenLoading={fetchTokenLoading}
                            handleFlip={handleFlip}
                            titleTranslate={titleTranslate}
                        />
                }
            </animated.div >
        </Container >
    );
};

export default memo(Authentication);
