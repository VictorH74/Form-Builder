import TextField from '@mui/material/TextField';
import styled from 'styled-components';

export const StyledField = styled(TextField)`
    width: 100% !important;
    margin: 5px 0 !important;

    & label, & input {
        color: white !important;
    }
`;