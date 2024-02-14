import { TextStyle } from 'react-native';
import { TextProps } from 'react-native-svg';

export type TypographyVariants = 'title' | 'subtitle' | 'text' | 'subtext';

export type TypographyColors = 'text' | 'subtext' | 'shade' | 'notification';

export type TypographyProps = {
    variant: TypographyVariants;
    color?: TypographyColors;
    style?: TextStyle;
} & TextProps;
