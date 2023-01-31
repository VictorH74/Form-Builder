import React, { useState, useRef, useCallback } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Actions, Container, Form, Title } from './styles';
import Input from './components/Input';

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

    const [isSignUp, setIsSignUp] = useState(false);
    const [flip, setFlip] = useState(false);

    const cardRef = useRef<HTMLDivElement>(null);

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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({
            isSignUp,
            ...formData
        });
    };

    return (
        <Container>
            <animated.div
                className="card"
                style={props}
                ref={cardRef}
            >
                <Form onSubmit={handleSubmit}>

                    <Title children={isSignUp ? 'Sign Up' : 'Login'} />

                    {
                        isSignUp ? (
                            <>
                                <Input label="Name" name="name"
                                    value={formData.name || ""}
                                    onChange={handleChange}
                                />
                                <Input label="Username" name="username"
                                    value={formData.username || ""}
                                    onChange={handleChange}
                                />
                                <Input label="Email" name="email"
                                    type="email"
                                    value={formData.email || ""}
                                    onChange={handleChange}
                                />
                            </>

                        ) : (
                            <Input label="Login" name="login" onChange={handleChange} value={formData.login || ""} />

                        )
                    }
                    <Input
                        label="Password"
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

                </Form>
            </animated.div>
        </Container>
    );
};

export default Authentication;
