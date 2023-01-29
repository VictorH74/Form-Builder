import styled from "styled-components";
import { ICheckmark } from "./types";

export const CheckboxLabel = styled.label`
    position: relative;
    height: fit-content;
    width: fit-content;
    display: block;
    cursor: pointer;
    font-weight: 400;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    padding-left: 30px;
    & p {
        color: #9E9D97;
        font-size: 1.2rem;
        line-height: 25px;

        &.checked {
            color: green;
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
    input:checked~span { background-color: green; }
    input:checked~span:after { display: block; }
`;

export const Checkmark = styled.span`
  background-color: #eee;
  position: absolute;
  top: 0;
  left: 0;
  height: 25px !important;
  width: 25px !important;
  border: 1px solid #727376;
  border-radius: ${({ borderRadius }: ICheckmark) => borderRadius || "5px"};
  
  &:after {
    ${({ spanHidden }: ICheckmark) => spanHidden ? "" : "content: '';"}
    position: absolute;
    display: none;
    left: 8px;
    top: 5px;
    height: 10px;
    width: 5px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
}
`;