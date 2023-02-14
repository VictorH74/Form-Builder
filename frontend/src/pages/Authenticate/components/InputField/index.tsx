import { FieldProps } from "formik"
import React from "react";
import { StyledField } from "./styles";

interface Props {
    field: FieldProps
    label: string;
}

const InputField: React.FC<Props> = ({ field, label }) => {
    return <StyledField {...field} label={label} variant="standard" />
};

export default InputField