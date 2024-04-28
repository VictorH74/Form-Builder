import styled from "styled-components";

export const Container = styled.div`
    position: relative !important;
    width: fit-content;

    & span {
        display: flex;
        flex-direction: row;
        gap: 3px;
        padding: 10px;
        cursor: pointer;

        & .point {
            height: 6px;
            width: 6px;
            background-color: white;
            border-radius: 50%;
        }

        &:hover {
            & .point {
                animation-name: jump;
                animation-duration: 600ms;
                animation-timing-function: ease-in-out;
                animation-fill-mode: both;

                &:nth-child(2) { animation-delay: 100ms; }
                &:nth-child(3) { animation-delay: 200ms; }

                @keyframes jump {
                    0% { translate: 0 0; }
                    50% { translate: 0 -5px; }
                    100% { translate: 0 0; }
                }
            }
        }
    }

    & .op {
        position: absolute !important;
        top: 0;
        left: 0;
        transition: 300ms;

        &:hover { scale: 120%; }
    }
`;