export interface ICheckmark {
    borderRadius?: string;
    spanHidden?: boolean;
}

export interface ICheckboxProps {
    checked?: boolean;
    label: string;
    className?: string;
    onChange: () => void;
}