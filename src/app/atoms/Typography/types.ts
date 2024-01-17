import { TextStyle } from 'react-native';
import { TextProps } from 'react-native-svg';

export type TypographyVariants =
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button';

export type TypographyProps = {
    variant: TypographyVariants;
    style?: TextStyle;
} & TextProps;
