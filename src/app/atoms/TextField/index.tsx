import { TextInput, TextStyle } from 'react-native';
import { TextFieldVariants, TextFieldProps } from './types';

const textFieldVariantStyles: Record<TextFieldVariants, TextStyle> = {
    standard: {
        borderColor: 'gray',
        paddingBottom: 5,
        borderBottomWidth: 1,
        fontSize: 16,
        color: 'white',
    },
    outlined: {
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        fontSize: 16,
    },
    filled: {
        borderColor: 'gray',
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        fontSize: 16,
    },
};

const TextField: React.FC<TextFieldProps> = function ({ variant, style = {}, ...props }) {
    return <TextInput style={[textFieldVariantStyles[variant], style]} selectTextOnFocus {...props} />;
};

export default TextField;
