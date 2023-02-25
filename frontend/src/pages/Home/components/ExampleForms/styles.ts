import styled from "styled-components"


export const Container = styled.div`
    width: fit-content;
    position: relative;

    & .example-form {
        background-color: white;
        box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.5);
        border-radius: 2px;
    }

    & .big {
        width: 13cm;
        height: 18cm;
    }

    & .medium {
        top: 0;
        left: -50px;
        width: 9cm;
        height: 13cm;
    }

    & .small {
        top: -40px;
        right: -45px;
        width: 7cm;
        height: 10cm;
    }

    & :where(.medium, .small) {
        position: absolute;
        top: 0;
    }
`;