import { Text as NativeText, TextStyle } from 'react-native';
import { TypographyProps, TypographyVariants } from './types';

const typographyVariantStyles: Record<TypographyVariants, TextStyle> = {
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {
        fontSize: 24,
        fontWeight: '900',
    },
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
};

const Typography: React.FC<TypographyProps> = function ({
    variant,
    style = {},
    ...props
}) {
    return (
        <NativeText
            style={[typographyVariantStyles[variant], style]}
            {...props}
        />
    );
};

export default Typography;
