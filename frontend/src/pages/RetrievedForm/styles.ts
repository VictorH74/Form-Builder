import styled from "styled-components"

export const Container = styled.div`
    display: grid;
    place-items: center;
`;

export const FormContainer = styled.div`
    background-color: whitesmoke !important;
    border-radius: 3px;
    margin: auto;
    padding: 20px;
    color: black;
    /* box-shadow: -5px -5px 20px rgba(255,255,255,0.2), 3px 3px 25px rgba(0,0,0,0.8); */
    box-shadow: 3px 3px 25px rgb(0, 0, 0);

    max-width: 21cm;
    min-height: 29.7cm;

    & .title {
        font-size: 1.3rem;
    }
`;

export const QuestionsContainer = styled.div`
    padding: 10px;
`;