import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 40px;
    gap: 2px;

    & .created {
        width: 100%;
        margin: 10px 0;
        padding: 0.5rem 1rem;
        background-color: transparent;
        border: 2px solid dodgerblue;
        font-weight: bolder;
        color: dodgerblue;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }
`;

export const CreatedAccountChecked = styled.div`
    height: 140px;
    width: 140px;
    background-color: #BAE0BD;
    border-radius: 50%;
    position: relative;
    display: block;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        translate: -90% 0;
        width: 30px;
        height: 50px;
        border: solid white;
        border-width: 0 4px 4px 0;
        transform: rotate(45deg) translateY(-50%);
    }

    &::after {
        content: '';
        position: absolute;
        top: 40%;
        left: 50%;
        translate: -90% 0;
        background-color: #BAE0BD;
        width: 35px;
        height: 55px;
        transform: rotate(45deg) translateY(-50%);
        animation: move 400ms linear 400ms forwards;

        @keyframes move {
            0% {
                top: 40%;
                left: 50%;
            } 50% {
                top: 55%;
                left: 65%;
            } 75% {
                top: 20%;
                left: 70%;
            } 100% {
                top: 10%;
                left: 90%;
            }
        }
    }

`;