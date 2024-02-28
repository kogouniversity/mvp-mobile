import { View, Image, StyleSheet, Text } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '.';
import { ListProps } from './types';
import { ImageSrcUrl } from '../../utils/images';

const meta: ComponentMeta<typeof List> = {
    title: 'Atoms/List',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    verticalList: {
        borderBottomWidth: 0.5,
        borderColor: '#d3d3d3',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {},
});

export const BasicList: Story = {
    render: args => (
        <List {...args}>
            <ListItem style={args.variant === 'vertical' ? styles.verticalList : styles.horizontalList}>
                <ListItemIcon>
                    <Image style={styles.images} source={ImageSrcUrl.alienAstronaut} />
                </ListItemIcon>
                <ListItemText primary="Title 1" style={styles.text} />
            </ListItem>
            <ListItem style={args.variant === 'vertical' ? styles.verticalList : styles.horizontalList}>
                <ListItemIcon>
                    <Image style={styles.images} source={ImageSrcUrl.alienAstronaut} />
                </ListItemIcon>
                <ListItemText primary="Title 2" />
            </ListItem>
        </List>
    ),
};

export const ButtonList: Story = {
    render: args => (
        <List {...args}>
            <ListItem style={styles.verticalList}>
                <ListItemButton>
                    <Text>button item</Text>
                </ListItemButton>
            </ListItem>
            <ListItem style={styles.verticalList}>
                <ListItemButton>
                    <Text>button item</Text>
                </ListItemButton>
            </ListItem>
        </List>
    ),
};

export const NestedList: Story = {
    render: args => (
        <List {...args}>
            <ListItem>
                <ListItemButton style={styles.verticalList}>
                    <ListItemIcon>
                        <Image style={styles.images} source={ImageSrcUrl.alienAstronaut} />
                    </ListItemIcon>
                    <ListItemText primary="Title 2" />
                </ListItemButton>
            </ListItem>
        </List>
    ),
};
