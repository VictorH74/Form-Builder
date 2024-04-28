import React from "react";
import { StyledTextArea } from "./styles";

interface TextAreaProps {
  value: string;
  placeholder?: string;
  onChange(value: string): void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: TextAreaProps) {
  const ref = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const textarea = ref.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + 2}px`;
    }
  }, [props.value]);

  return (
    <StyledTextArea
      ref={ref}
      rows={1}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => {
        props.onChange(e.currentTarget.value);
      }}
      onFocus={props.onFocus}
    />
  );
}