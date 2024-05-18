import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyGroupFeed from '../../../components/post/MyGroupFeed/MyGroupFeed';
import TextField from '../../../atoms/TextField';
import GroupCount from '../../../components/group/GroupCount';

const userID = '3';

function GroupMyGroupsFeed(): JSX.Element {
    return (
        <View style={{ flex: 1 }}>
            <TextField variant="outlined" placeholder="Search..." style={{ margin: 10 }} />
            <GroupCount userID={userID} />
            <MyGroupFeed userID={userID} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default GroupMyGroupsFeed;
