import styled from "styled-components";

export const Container = styled.main`
    display: flex;
    flex-direction: row;
    padding: 10px;
    max-width: 1400px;
`;

export const Content = styled.div`
    position: relative;
    padding: 10px;
    flex: 1 1 auto;
`;

export const ScrollTopBtn = styled.button`
    padding: 10px 25px;
    background-color: var(--pinkColor);
    border: none;
    border-radius: 5px;
    font-size: 1.2rem;
    position: fixed;
    bottom: 30px;
    right: 10px;
    opacity: 0;
    animation-name: fadeIn;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
    cursor: pointer;
    

    @keyframes fadeIn {
        from {
            opacity: 0;
            right: 10px;
        }
        to {
            opacity: 1;
            right: 30px;
        }
    }
`;
