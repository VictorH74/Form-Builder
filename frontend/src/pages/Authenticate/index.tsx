import React, { useState, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Actions, Container, Form, InputField, Title } from './styles';
import { useMutation } from 'graphql-hooks';
import { LOGIN_MUTATION } from './graphql_operators';
import useGraphQlClient from '@/hooks/UseGraphQlClient';
import { useAuth } from '@/hooks/UseAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';


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
    const [fetchToken, { loading, error, data }] = useMutation(LOGIN_MUTATION)
    const client = useGraphQlClient()
    const userCtx = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [flip, setFlip] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();


    const props = useSpring({
        transform: `perspective(600px) rotateY(${flip ? 360 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
        from: { transform: 'perspective(600px) rotateY(0deg)' },
    });

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
            let { token } = res.data.tokenAuth

            localStorage.setItem("form_builder-token", token);
            client.setHeader('Authorization', `JWT ${token}`)

            let user = await userCtx.fetchUser()
            userCtx.setUser(user.data.me)
        }
    };

    if (userCtx?.authenticated) return <Navigate to="/my-forms/" replace />

    /*
    <Box
      component={Form}
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    </Box>
    */

    return (
        <Container>
            <animated.div
                className="card"
                style={props}
                ref={cardRef}
            >
                <Box
                    component={Form}
                    noValidate
                    autoComplete="true"
                    onSubmit={handleSubmit}

                >

                    <Title children={isSignUp ? 'Sign Up' : 'Login'} />

                    {
                        isSignUp ? (
                            <>
                                <InputField id="outlined-basic" label="Name" variant="outlined"
                                    name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                />
                                <InputField id="outlined-basic" label="Username" variant="outlined"
                                    name="username"
                                    value={formData.username || ""}
                                    onChange={handleChange}
                                />
                                <InputField id="outlined-basic" label="Email" variant="outlined"
                                    name="email"
                                    type="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                />
                            </>

                        ) : (
                            <InputField id="outlined-basic" label="Login" variant="outlined"
                                name="login" onChange={handleChange} value={formData.login || ""} />

                        )
                    }
                    <InputField id="outlined-basic" label="Password" variant="outlined"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />


                    <Actions>
                        <button type="submit" >
                            {isSignUp ? 'Sign Up' : 'Login'}
                        </button>
                        <button type="button" onClick={handleFlip} >
                            {isSignUp ? 'Login' : 'Sign Up'}
                        </button>
                    </Actions>

                </Box>
            </animated.div>
        </Container>
    );
};

export default Authentication;
