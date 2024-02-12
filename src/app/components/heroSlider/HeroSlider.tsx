import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Typography from '../../atoms/Typography';
import { List, ListItem, ListItemText } from '../../atoms/List';

export type Data = {
    courseName: string;
    location: string;
    time: string;
};

export type HeroSliderProps = {
    data: Data[];
};

const styles = StyleSheet.create({
    body: {
        paddingVertical: 10,
    },
    scroll: {
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingHorizontal: 5,
    },
    container: {
        borderWidth: 0.5,
        borderColor: '#D3D3D3',
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        width: 350,
    },
    title: {
        margin: 5,
    },
    leftText: {
        marginLeft: 10,
    },
    rightText: {
        marginRight: 10,
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
});

const HeroSliderItem: React.FC<HeroSliderProps> = function ({ data }) {
    return (
        <View style={styles.container}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Today's Lecture
            </Typography>
            <List variant="vertical">
                {data.map(datum => {
                    return (
                        <ListItem style={styles.item}>
                            <ListItemText
                                primary={
                                    <Typography variant="text" color="text">
                                        {datum.courseName}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="subtext" color="text">
                                        {datum.location}
                                    </Typography>
                                }
                                style={styles.leftText}
                            />
                            <ListItemText
                                primary={
                                    <Typography variant="text" color="text">
                                        {datum.time}
                                    </Typography>
                                }
                                style={styles.rightText}
                            />
                        </ListItem>
                    );
                })}
            </List>
        </View>
    );
};

const HeroSlider: React.FC<HeroSliderProps> = function ({ data }) {
    return (
        <View style={styles.body}>
            <ScrollView horizontal contentContainerStyle={styles.scroll}>
                <HeroSliderItem data={data} />
                <HeroSliderItem data={data} />
            </ScrollView>
        </View>
    );
};

export default HeroSlider;
