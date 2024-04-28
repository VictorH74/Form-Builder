import styled from "styled-components";

export const CheckboxLabel = styled.label`
    position: relative;
    height: fit-content;
    width: fit-content;
    display: block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-left: 30px;
    & p {
        color: #9E9D97;
        font-size: 1.1rem;
        line-height: 25px;

        &.checked {
            color: ${({ checkedColor }: { checkedColor: string }) => checkedColor || "green"};
        }
    }
    input {
        position: absolute;
        height: 0;
        width: 0;
        opacity: 0;
        cursor: pointer;
    }
    &:hover input~span { background-color: #ccc; }
    input:checked~span { background-color: ${({ checkedColor }: { checkedColor: string }) => checkedColor || "green"}; }
    input:checked~span:after { display: block; }
`;