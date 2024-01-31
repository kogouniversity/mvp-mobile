import { View, Image, Text, StyleSheet } from 'react-native';
import type { ComponentMeta, StoryFn, StoryObj } from '@storybook/react-native';
import { List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '.';
import { ListProps } from './types';

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
        )
    ]
}

export default meta;

type Story = StoryObj<ListProps>;

const styles = StyleSheet.create({
    images: {
        width: 90,
        height: 90
    },
    horizontalItem: {
        alignItems: 'center'
    },
    verticalItem: {
        
    }
})

export const Horizontal: Story = {
    args: {
        variant: 'horizontal',
        children: [
            <ListItem style={styles.horizontalItem}>
                <ListItemButton
                    selected={false}
                >
                    <ListItemIcon>
                        <Image style={styles.images} source={require('../../assets/images/alienAstronaut.png')} />
                    </ListItemIcon>
                </ListItemButton>
                <ListItemText primary="Title 1" />
            </ListItem>
            ,
            <ListItem style={styles.horizontalItem}>
                <ListItemIcon>
                    <Image style={styles.images} source={require('../../assets/images/alienAstronaut.png')} />
                </ListItemIcon>
                <ListItemText primary="Title 2" />
            </ListItem>
        ]
    },
};

export const Vertical: Story = {
    args: {
        variant: 'vertical',
        children: [
            <ListItem style={styles.verticalItem}>
                <ListItemIcon>
                    <Image source={require('../../assets/images/alienAstronaut.png')} />
                </ListItemIcon>
                <ListItemText primary="Hello" />
            </ListItem>
            ,
            <ListItem style={styles.verticalItem}>
                <ListItemIcon>
                    <Image source={require('../../assets/images/alienAstronaut.png')} />
                </ListItemIcon>
                <ListItemText primary="Hello" />
            </ListItem>
        ]
    },
};