import { ReactElement } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

export type ListVariant = 'horizontal' | 'vertical';

export type ListProps = {
    children?: ListItemType | ListItemType[];
    style?: ViewStyle;
    variant?: ListVariant;
};

export type ListItemType = ReactElement<ListItemProps>;

export type ListItemProps = {
    children?: React.ReactNode;
    style?: ViewStyle;
};

export type ListItemButtonProps = {
    style?: ViewStyle;
    children?: React.ReactNode;
    onPress?: () => void;
};

export type ListItemIconProps = {
    style?: ViewStyle;
    children?: React.ReactNode;
};

export type ListItemTextProps = {
    style?: TextStyle;
    primary?: string | React.ReactNode;
    secondary?: string | React.ReactNode;
};
