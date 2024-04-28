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
    position: relative;
`;

interface ILabel {
    shape: string;
    shapeType: string;
    shapeSize: number;
    shapeColor: string;
    numberColor: string;
    statementColor: string;
}

export const Label = styled.label`
    display: flex;
    flex-direction: row;
    gap: 10px;
    font-size: 1.2rem;

    & p {
        display: grid;
        place-items: center;
        height: ${({shapeSize}:ILabel) => `${shapeSize}px`}; /* 25 - 50 */
        aspect-ratio: 1/1;
        /* padding: 5px 10px; */
        background-color: ${({shapeColor, shapeType}: ILabel) => shapeType === "filled" && shapeColor ? `${shapeColor}` : "transparent"};
        /* padding: 5px; */
        border: ${({shapeType, shapeColor}: ILabel) => shapeType === "outline" ? `1px solid ${shapeColor}` : "none"};
        border-radius: ${({shape}: ILabel) => shape === "rounded" ? "50%" : shape === "square" ? "5px" : "none"};
        /* border-radius: 50%; */
        color: ${({numberColor}: ILabel) => numberColor ? `${numberColor}` : "white"};
    }

    & textarea {
        color: ${({statementColor}: ILabel) => statementColor ? `${statementColor}` : "#000000"};
        border: none;
        border-bottom: 2px solid var(--mainColor);
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
        /* position: relative; */
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