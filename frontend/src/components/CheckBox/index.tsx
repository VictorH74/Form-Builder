import React from "react";
import { CheckboxLabel } from "./styles";
import { ICheckboxProps } from "./types";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const Checkbox: React.FC<ICheckboxProps> = ({ checked, className, onChange, rounded }) => (
    <CheckboxLabel className={className || ""} checkedColor="dodgerblue" >
        <input
            type="checkbox"
            onChange={onChange}
            checked={checked}
        />
        <div style={{position: "absolute", left: 0}}>
            {checked ? <CheckIcon sx={{color: "#1E90FF"}} /> : <CloseIcon />}
        </div>
        
    </CheckboxLabel>
)

export default Checkbox;