import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const InputField = styled(TextField)`
    width: 100% !important;
    margin: 5px 0 !important;

    & label, & input {
        color: white !important;
    }
`;

export const ErrorMsg = styled.p`
    width: 100%;
    text-align: right;
    color: #421212;
    font-weight: bolder;
    line-height: normal;
`;