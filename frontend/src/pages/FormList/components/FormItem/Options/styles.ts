import styled from "styled-components";

export const Container = styled.div`
    position: relative !important;
    width: fit-content;

    & span {
        cursor: pointer;
    }

    & .op {
        position: absolute !important;
        top: 0;
        left: 0;
        transition: 300ms;
    }
`;