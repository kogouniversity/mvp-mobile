import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import { SkeletonProps, SkeletonVariant } from './types';

const skeletonVariantStyles: Record<SkeletonVariant, ViewStyle> = {
    text: {},
    circular: {
        borderRadius: 9999,
    },
    rectangular: {},
    rounded: {
        borderRadius: 10,
    },
};

const Skeleton: React.FC<SkeletonProps> = function ({ variant = 'text', width, height, style = {} }) {
    const opacity = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 500,
                }),
                Animated.timing(opacity, {
                    toValue: 0.3,
                    useNativeDriver: true,
                    duration: 800,
                }),
            ]),
        ).start();
    }, [opacity]);

    const baseStyle: ViewStyle = {
        width,
        height,
        backgroundColor: '#e0e0e0',
    };

    return <Animated.View style={[baseStyle, skeletonVariantStyles[variant], style, { opacity }]} />;
};

export default Skeleton;
