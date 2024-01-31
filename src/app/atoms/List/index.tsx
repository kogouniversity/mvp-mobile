import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ViewStyle,
    FlatList,
} from 'react-native';
import {
    ListProps,
    ListItemProps,
    ListItemButtonProps,
    ListVariant,
    ListItemIconProps,
    ListItemTextProps,
    ListItemType,
} from './types';

const listVariantStyle: Record<ListVariant, ViewStyle> = {
    horizontal: {},
    vertical: {},
};

// <ListItemButton></ListItemButton>

const ListItemButton: React.FC<ListItemButtonProps> = function ({
    style = {},
    children,
    onPress = () => {},
}) {
    return (
        <TouchableOpacity style={[style]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

// <ListItemIcon></ListItemIcon>

const ListItemIcon: React.FC<ListItemIconProps> = function ({
    style = {},
    children,
}) {
    return <View>{children}</View>;
};

// <ListItemText />

const ListItemText: React.FC<ListItemTextProps> = function ({
    style,
    primary,
    secondary,
}) {
    return (
        <View style={[style]}>
            {typeof primary === 'string' ? <Text>{primary}</Text> : primary}
            {typeof secondary === 'string' ? (
                <Text>{secondary}</Text>
            ) : (
                secondary
            )}
        </View>
    );
};

// <ListItem></ListItem>

const ListItem: React.FC<ListItemProps> = function ({ style, children }) {
    return <View style={[style]}>{children}</View>;
};

const List: React.FC<ListProps> = function ({ style, variant, children }) {
    return (
        <View
            style={
                variant === 'horizontal'
                    ? listVariantStyle.horizontal
                    : listVariantStyle.vertical
            }>
            {variant === 'horizontal' ? (
                // horizontal list
                <FlatList
                    data={children as ArrayLike<ListItemType>}
                    renderItem={({ item }) => <View>{item}</View>}
                    horizontal
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                // vertical list
                <FlatList
                    data={children as ArrayLike<ListItemType>}
                    renderItem={({ item }) => <View>{item}</View>}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    );
};

export { List, ListItem, ListItemButton, ListItemIcon, ListItemText };
