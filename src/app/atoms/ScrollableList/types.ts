import { ReactNode, ReactElement } from 'react';
import { Animated, ViewStyle, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

export type ListVariant = 'horizontal' | 'vertical';

export interface ScrollableListProps {
    style?: ViewStyle;
    variant: ListVariant;
    children: ReactNode;
    onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export interface ListItemProps {
    style?: ViewStyle;
    children: ReactNode;
}

export type ListItemType = ReactElement<ListItemProps>;
