import { Text as NativeText, TextStyle } from 'react-native';
import { TypographyProps, TypographyVariants, TypographyColors } from './types';

const typographyVariantStyles: Record<TypographyVariants, TextStyle> = {
    title:{
        fontSize: 32,
    },
    subtitle: {
        fontSize: 20,
    },
    text:{
        fontSize: 13,
    },
    subtext:{
        fontSize: 11,
    },
};

const typographyColorStyles: Record<TypographyColors, TextStyle> = {
    text:{
        color: '#000000',
    },
    subtext:{
        color: '#5a5a5a',
    },
    shade:{
        color: '#d3d3d3',
    },
    notification:{
        color: '#ff0000',
    },
};

const Typography: React.FC<TypographyProps> = function ({
    variant,
    color,
    style = {},
    ...props
}) {
    return (
        <NativeText
            style={[typographyVariantStyles[variant], typographyColorStyles[color], style]}
            {...props}
        />
    );
};

export default Typography;
