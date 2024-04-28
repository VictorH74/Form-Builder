export interface ICheckmark {
    borderRadius?: string;
    spanHidden?: boolean;
}

export interface ICheckboxProps {
    checked?: boolean;
    className?: string;
    onChange: () => void;
    rounded?: boolean;
}