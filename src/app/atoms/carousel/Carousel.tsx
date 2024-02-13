import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    ListRenderItem,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
    ViewStyle,
    ViewToken,
} from 'react-native';

const width = Dimensions.get('screen').width;

export type CarouselProp<T> = {
    data: T[];
    renderItem: (data: T) => React.ReactNode;
    boxStyle?: ViewStyle;
};

export type PaginationProp<T> = {
    data: T[];
    scrollX: Animated.Value;
};

const styles = StyleSheet.create({
    container: {
        width,
    },
    dotsContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 12,
        height: 5,
        borderRadius: 6,
        backgroundColor: '#d3d3d3',
        marginHorizontal: 3,
    },
});

const Pagination = <T extends object>({ data, scrollX }: PaginationProp<T>) => {
    return (
        <View style={styles.dotsContainer}>
            {data.map((_, i) => {
                const inputRange = [
                    (i - 1) * width,
                    i * width,
                    (i + 1) * width,
                ];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={i.toString()}
                        style={[styles.dot, { width: dotWidth }]}
                    />
                );
            })}
        </View>
    );
};

const Carousel = <T extends object>({
    data,
    renderItem,
    boxStyle,
}: CarouselProp<T>) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(e);
    };

    return (
        <View>
            <View style={[styles.container, boxStyle]}>
                <FlatList
                    data={data}
                    renderItem={renderItem as ListRenderItem<T>}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleOnScroll}
                />
            </View>
            <Pagination data={data} scrollX={scrollX} />
        </View>
    );
};

export default Carousel;
