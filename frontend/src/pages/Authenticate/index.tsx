import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Actions, Container, Form, InputField, Title } from './styles';
import { useMutation } from 'graphql-hooks';
import { LOGIN_MUTATION } from './graphql_operators';
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
    const [formData, setFormData] = useState<FormData>({
        login: '',
        password: '',
    });
    const [fetchToken, { loading }] = useMutation(LOGIN_MUTATION)
    const client = useGraphQlClient()
    const userCtx = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [flip, setFlip] = useState(false);

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

        if (isSignUp) return console.log(formData)
        else {
            if (!client || !userCtx) return alert("Erro ao tentar logar!");

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

        }
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
                    <Title children={isSignUp ? 'Sign Up' : 'Login'} />

                    {
                        isSignUp ? (
                            <>
                                <InputField id="name" label="Name" variant="standard"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                    required
                                />
                                <InputField id="username" label="Username" variant="standard"
                                    name="username"
                                    value={formData.username || ""}
                                    onChange={handleChange}
                                    required
                                />
                                <InputField id="email" label="Email" variant="standard"
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
                    <InputField id="password" label="Password" variant="standard"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <Actions>
                        <button type="submit" disabled={loading} >
                            {isSignUp ? 'Sign Up' : 'Login'}
                        </button>
                        <button type="button" onClick={handleFlip} disabled={loading} >
                            {isSignUp ? 'Login' : 'Sign Up'}
                        </button>
                    </Actions>

                </Box>


            </animated.div>
        </Container>
    );
};

export default Authentication;
