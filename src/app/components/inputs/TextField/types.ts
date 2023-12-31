import { TextInputProps } from 'react-native';

export type TextFieldVariants = 'standard' | 'outlined' | 'filled';

export type TextFieldProps = {
    variant: TextFieldVariants;
    label: string;
} & TextInputProps;
