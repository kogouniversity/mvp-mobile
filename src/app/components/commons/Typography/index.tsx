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

function Typography(props: TypographyProps): React.JSX.Element {
    const { variant, style = {}, children } = props;
    return (
        <NativeText style={[typographyVariantStyles[variant], style]}>
            {children}
        </NativeText>
    );
}

export default Typography;
