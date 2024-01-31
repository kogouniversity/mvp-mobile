import { View, Image, StyleSheet, Text } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '.';
import { ListItemType, ListProps } from './types';
import { ImageSrc } from '../../utils/assets';

const meta: ComponentMeta<typeof List> = {
    title: 'Design System/Atoms/List',
    component: List,
    argTypes: {
        variant: {
            options: ['horizontal', 'vertical'],
            control: { type: 'radio' },
        },
    },
    decorators: [
        (Story: StoryFn): JSX.Element => (
            <View>
                <Story />
            </View>
        ),
    ],
};

export default meta;

type Story = StoryObj<ListProps>;

const styles = StyleSheet.create({
    images: {
        width: 90,
        height: 90,
    },
    horizontalList: {
        alignItems: 'center',
    },
    verticalList: {},
});

export const BasicList: Story = {
    args: {
        children: [
            <ListItem style={styles.verticalList}>
                <ListItemIcon>
                    <Image
                        style={styles.images}
                        source={ImageSrc.alienAstronaut}
                    />
                </ListItemIcon>
                <ListItemText primary="Title 2" />
            </ListItem>,
            <ListItem style={styles.verticalList}>
                <ListItemIcon>
                    <Image
                        style={styles.images}
                        source={ImageSrc.alienAstronaut}
                    />
                </ListItemIcon>
                <ListItemText primary="Title 2" />
            </ListItem>,
        ],
    },
};

export const ButtonList: Story = {
    args: {
        children: [
            <ListItem style={styles.verticalList}>
                <ListItemButton>
                    <Text>button item</Text>
                </ListItemButton>
            </ListItem>,
            <ListItem style={styles.verticalList}>
                <ListItemButton>
                    <Text>button item</Text>
                </ListItemButton>
            </ListItem>,
        ],
    },
};

export const NestedList: Story = {
    args: {
        children: [
            ...(BasicList.args?.children as ListItemType[]),
            <List>
                <ListItem>
                    <ListItemButton style={styles.verticalList}>
                        <ListItemIcon>
                            <Image
                                style={styles.images}
                                source={ImageSrc.alienAstronaut}
                            />
                        </ListItemIcon>
                        <ListItemText primary="Title 2" />
                    </ListItemButton>
                </ListItem>
            </List>,
        ],
    },
};
