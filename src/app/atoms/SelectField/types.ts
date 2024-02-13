export interface OptionType {
    label: string;
    value: string;
}

export interface SelectFieldProps {
    label: string;
    data: Array<{ label: string; value: string }>;
    onSelect: (item: { label: string; value: string }) => void;
}
