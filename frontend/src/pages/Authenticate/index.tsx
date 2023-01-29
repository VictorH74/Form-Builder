
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import './styles.css';

function Authenticate() {
    const [formType, setFormType] = useState('login');

    function handleFormTypeChange(newType: string) {
        setFormType(newType);
    }

    return (
        <div className="card-container">
            <CSSTransition
                in={formType === 'login'}
                timeout={300}
                classNames="card"
                unmountOnExit
            >
                <LoginForm onFormTypeChange={handleFormTypeChange} />
            </CSSTransition>
            <CSSTransition
                in={formType === 'signup'}
                timeout={300}
                classNames="card"
                unmountOnExit
            >
                <SignupForm onFormTypeChange={handleFormTypeChange} />
            </CSSTransition>
        </div>
    );
}

interface IFormProps {
    onFormTypeChange: (type: string) => void
}

const LoginForm: React.FC<IFormProps> = ({ onFormTypeChange }) => {
    return (
        <form>
            <h2>Login</h2>
            <label>
                Email
                <input type="email" name="email" />
            </label>
            <br />
            <label>
                Senha
                <input type="password" name="password" />
            </label>
            <br />
            <button type="submit">Entrar</button>
            <button type="button" onClick={() => onFormTypeChange('signup')}>
                Cadastrar
            </button>
        </form>
    );
}

const SignupForm: React.FC<IFormProps> = ({ onFormTypeChange }) => {
    return (
        <form>
            <h2>Cadastrar</h2>
            <label>
                Nome completo
                <input type="text" name="name" />
            </label>
            <br />
            <label>
                Email
                <input type="email" name="email" />
            </label>
            <br />
            <label>
                Senha
                <input type="password" name="password" />
            </label>
            <br />
            <button type="submit">Cadastrar</button>
            <button type="button" onClick={() => onFormTypeChange('login')}>
                Voltar para Login
            </button>
        </form>
    );
}

export default Authenticate