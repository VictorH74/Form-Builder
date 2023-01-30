import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    margin: 20px auto;
    padding: 20px;
    border: 1px solid purple;
    display: flex;
    gap: 10px;
    /* flex-direction: row; */
    /* align-content: space-between; */
`;

export const NewForm = styled.div`
    flex: 1 1 auto;
    border: 1px solid tomato;
`;

export const QuestionComponents = styled.div`
    border: 1px solid tomato;
    width: 300px;
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
    width: 100%;

`;

export const Backward = styled(Link)`
    position: absolute;
    top: 20px;
    left: 20px;
    cursor: pointer;
`;
