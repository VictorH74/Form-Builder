import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    transition: 300ms;
    width: 100%;

    & input {
        border: 1px solid gray;
        padding: 10px;
        height: 40px;
        width: 100%;
    }

    & label {
        position: absolute;
        transition: 300ms !important;
        pointer-events: none;
    }
`;