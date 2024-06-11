import React from 'react';
import { View, ViewStyle, Animated, FlatList } from 'react-native';
import uuid from '../../utils/uuid';
import { ScrollableListProps, ListItemProps, ListVariant, ListItemType } from './types';

const listVariantStyle: Record<ListVariant, ViewStyle> = {
    vertical: {},
    horizontal: {},
};

const ListItem: React.FC<ListItemProps> = function ({ style, children }) {
    return <View style={[style]}>{children}</View>;
};

const ScrollableList: React.FC<ScrollableListProps> = function ({ style, variant, children, onScroll }) {
    return (
        <View style={[style, listVariantStyle[variant]]}>
            <Animated.FlatList
                data={React.Children.toArray(children) as ListItemType[]}
                renderItem={({ item, index }) => <View key={uuid(index)}>{item}</View>}
                onScroll={onScroll}
                keyExtractor={(item, index) => uuid(index)}
            />
        </View>
    );
};

export { ScrollableList, ListItem };
