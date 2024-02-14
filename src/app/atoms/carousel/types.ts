import { Animated, ViewStyle } from 'react-native';

export type CarouselProp<T> = {
    data: T[];
    renderItem: (data: T) => React.ReactNode;
    boxStyle?: ViewStyle;
};

export type PaginationProp<T> = {
    data: T[];
    scrollX: Animated.Value;
};
