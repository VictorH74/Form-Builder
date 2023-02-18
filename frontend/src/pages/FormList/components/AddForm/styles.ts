import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    margin: 30px auto;
    padding: 20px;
    display: flex;
    gap: 10px;
`;

export const NewForm = styled.form`
    flex: 1 1 auto;
    margin: 10px;
    padding: 10px;
    min-width: 400px;
    border-radius: 10px;
    box-shadow: -5px -5px 20px rgba(255,255,255,0.2), 3px 3px 25px rgba(0,0,0,0.8);
    transition: 300ms;
    & button {
        background-color: var(--pinkColor);
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        transition: 400ms;

        &:hover {
            scale: 105%;
        }
    }
`;

export const QuestionComponents = styled.div`
    border: 1px dashed var(--pinkColor);
    border-radius: 5px;
    width: 300px;
    height: fit-content;
`;

export const QuestionsContainer = styled.div`
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
    top: 0;
    left: 20px;
    cursor: pointer;
`;

export const SubmitBtn = styled.button.attrs({
    type: "submit",
})`
    background-color: dodgerblue !important;
    font-size: 18px;
    margin: 10px;
    margin-left: 50%;
    translate: -50% 0;
    width: 40%;
    border-radius: 10px !important;
`;
