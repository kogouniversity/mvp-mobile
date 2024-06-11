import React from 'react';
import { View, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import DraggableListItem, { DraggableListItemProps } from './index';

const meta: ComponentMeta<typeof DraggableListItem> = {
    title: 'Components/DraggableListItem',
    component: DraggableListItem,
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: '#f5fcff',
                }}>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type DLStory = StoryObj<DraggableListItemProps>;

export const Default: DLStory = {
    args: {
        onLeavePress: () => Alert.alert('Leave pressed'),
    },
    render: args => (
        <DraggableListItem {...args}>
            <TouchableOpacity style={styles.item} onPress={() => Alert.alert('Item pressed')}>
                <Text style={styles.text}>된다된다</Text>
            </TouchableOpacity>
        </DraggableListItem>
    ),
};

const styles = StyleSheet.create({
    item: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    text: {
        fontSize: 18,
    },
});
