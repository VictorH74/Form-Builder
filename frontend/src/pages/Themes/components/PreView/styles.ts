import styled from "styled-components"

export const Container = styled.div`
    position: relative;
    height: 165px;
    width: 270px;
    border-radius: 3px;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 2px 2px 20px rgb(0, 0, 0);
    transition: 400ms;

    &:before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        background-color: ${({bg} : {bg : string}) => bg};
        height: 10px;
    }

    &:after {
        content: "";
        position: absolute;
        top: 15px;
        bottom: 5px;
        left: 4px;
        background-color: ${({bg} : {bg : string}) => bg};
        width: 30px;
        border-radius: 2px;
    }

    &:hover {
        scale: 105%;
        box-shadow: 1px 1px 30px rgb(0, 0, 0);
    }
`;