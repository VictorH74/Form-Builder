import React from "react";
import { CheckboxLabel, Checkmark } from "./styles";
import { ICheckboxProps } from "./types";

const Checkbox: React.FC<ICheckboxProps> = ({ checked, label, className, onChange }) => (
    <CheckboxLabel className={className || ""} >
        <p className={checked ? "checked" : ""} >{label}</p>
        <input
            type="checkbox"
            onChange={onChange}
            checked={checked}
        />
        <Checkmark />
    </CheckboxLabel>
)

export default Checkbox;