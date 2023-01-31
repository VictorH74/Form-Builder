import React, { useEffect, useRef, useState } from "react"
import { Container } from "./styles"


interface InputProps {
    className?: string
    type?: string
    name: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string
    label: string
}

const Input: React.FC<InputProps> = (props) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);

    useEffect(() => {
        if (isFocused) {
            labelRef.current!.style.top = '-20px';
            labelRef.current!.style.left = '10px';
            labelRef.current!.style.fontSize = '12px';
        } else if (!props.value) {
            labelRef.current!.style.top = '20%';
            labelRef.current!.style.left = '20px';
            labelRef.current!.style.fontSize = '16px';
        }
    }, [isFocused]);


    return (
        <Container className="form-group">
            <input
                {...props}
                ref={inputRef}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <label ref={labelRef} >
                {props.label}
            </label>
        </Container>
    );
};

export default Input;