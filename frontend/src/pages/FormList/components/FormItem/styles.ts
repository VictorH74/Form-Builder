import styled from "styled-components";

export const Container = styled.div`
    color: white;
    height: 60px;
    background-color: var(--mainColor);
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

export const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    height: fit-content;
    width: fit-content;
`;