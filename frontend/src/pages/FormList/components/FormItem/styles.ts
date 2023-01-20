import styled from "styled-components";

export const Container = styled.div`
    color: white;
    height: 60px;
    background-color: var(--pinkColor);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

export const Title = styled.h2`
    max-height: 50px;
    font-weight: 500;
    flex: 1 1 auto;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 1.2rem;
`;

interface IButton {
    t: "delete" | "view"
}

export const Button = styled.button<IButton>`
    height: 50px;
    width: 100px;
    color: white;
    border: none;
    border-radius: 5px;
    background-color: ${({t}) => t === "view" ? "#0D11A5" : "#AC2B2E"};
    margin: 0 5px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    height: fit-content;
    width: fit-content;
`;