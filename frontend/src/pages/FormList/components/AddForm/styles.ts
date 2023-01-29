import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    max-width: 700px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid purple;
    display: flex;
    flex-direction: column;
`;

export const QuestionsContainer = styled.div`
    border: 1px solid purple;
    padding: 10px;
`;

export const TitleInput = styled.input`
    color: white;
    font-size: 1.3rem;
    border: none;
    background-color: transparent;
    padding: 10px;
    width: fit-content;

`;

export const Backward = styled(Link)`
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
`;
