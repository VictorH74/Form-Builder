import React from "react";
import { CheckboxLabel, Checkmark } from "./styles";
import { ICheckboxProps } from "./types";

const Checkbox: React.FC<ICheckboxProps> = ({ checked, label, className, onChange }) => (
    <CheckboxLabel className={className || ""} checkedColor="dodgerblue" >
        <p className={checked ? "checked" : ""} >{label}</p>
        <input
            type="checkbox"
            onChange={onChange}
            checked={checked}
        />
        <Checkmark borderRadius="50px" />
    </CheckboxLabel>
)

export default Checkbox;