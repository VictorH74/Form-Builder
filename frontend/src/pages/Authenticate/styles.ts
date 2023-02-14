import styled from "styled-components";
import TextField from '@mui/material/TextField';
import { Form as FormikForm } from 'formik';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    & .card {
        width: 400px;
        height: 500px;
        background-color: var(--pinkColor);
        border-radius: 10px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }
`;

// styled(FormikForm)
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    gap: 2px;
`;

export const Title = styled.h2`
    margin-bottom: 1rem;`
    ;

export const InputField = styled(TextField)`
    width: 100% !important;
    margin: 5px 0 !important;

    & label, & input {
        color: white !important;
    }
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 8px;
    
    & button[type="submit"] {
        padding: 0.5rem 1rem;
        background-color: dodgerblue;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }

    & button[type="button"] {
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 2px solid dodgerblue;
        font-weight: bolder;
        color: dodgerblue;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }
`;