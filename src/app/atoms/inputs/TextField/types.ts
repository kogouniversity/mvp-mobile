import { TextInputProps, ViewStyle } from 'react-native';

export type TextFieldVariants = 'standard' | 'outlined' | 'filled';

export type TextFieldProps = {
    variant: TextFieldVariants;
    style?: ViewStyle;
} & TextInputProps;
