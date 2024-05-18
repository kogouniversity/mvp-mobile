import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyGroupFeed from '../../components/post/MyGroupFeed/MyGroupFeed';
import Trending from '../../components/post/Trending/Trending';
import Header from '../../components/MainScreenHeader/MainScreenHeader';

const userID = '3';

function Main(): JSX.Element {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <View style={styles.spacing} />
            <Trending userID={userID} />
            <MyGroupFeed userID="2" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacing: {
        height: 10,
    },
});

export default Main;
