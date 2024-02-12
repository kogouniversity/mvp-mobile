import { ViewStyle } from 'react-native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
    variant?: SkeletonVariant;
    width: number;
    height: number;
    style?: ViewStyle;
}
