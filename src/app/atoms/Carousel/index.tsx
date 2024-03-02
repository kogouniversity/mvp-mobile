import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    ListRenderItem,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
    View,
} from 'react-native';
import { CarouselProp, PaginationProp } from './types';

const { width } = Dimensions.get('screen');

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

function Pagination<T extends object>({ data, scrollX }: PaginationProp<T>) {
    return (
        <View style={styles.dotsContainer}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        // eslint-disable-next-line react/no-array-index-key
                        key={i.toString()}
                        style={[styles.dot, { width: dotWidth }]}
                    />
                );
            })}
        </View>
    );
}

function Carousel<T extends object>({ data, renderItem, boxStyle = {} }: CarouselProp<T>): JSX.Element {
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
                    renderItem={(info => renderItem(info.item)) as ListRenderItem<T>}
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
}

export default Carousel;
