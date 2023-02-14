import styled from "styled-components";

export const Container = styled.div`
    position: relative;
    margin: 10px 0;

    & .answer-spn {
        font-style: italic;
        font-size: .8rem;
        margin-left: 50px;
    }
`;

export const AlternativesContainer = styled.div`
    padding-left: 40px;
`;


export const Label = styled.label`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;

    & p {
        background-color: var(--pinkColor);
        padding: 5px 10px;
        border-radius: 50%;
    }

    & input {
        border: none;
        border-bottom: 2px solid var(--pinkColor);
        outline: none;
        padding: 5px 10px;
        height: auto;
        font-size: 1.1rem;
        background-color: transparent;
        min-height: 40px;
        width: 100%;
        min-width: 90%;
        overflow: hidden;
    }
`;

export const Alternatives = styled.ol`
    & li {
        margin: 5px 0;
        position: relative;
        margin-left: 20px;

        & .inner-li {
            display: flex;
            flex-direction: row;
            text-align: center;
            gap: 5px;

            & .alt-checkbox {
                translate: 0 4px;
            }

            & input {
                border: none;
                background-color: transparent;
                font-size: 1.1rem;
                padding: 5px 10px;  
                flex: 1 1 auto;
            }
        }

        
        
    }
`;



export const AlternativeLabel = styled.p`
    ${({correta} : {correta: boolean | undefined}) => correta ? "color: var(--blueColor) !important;" : ""}
`;