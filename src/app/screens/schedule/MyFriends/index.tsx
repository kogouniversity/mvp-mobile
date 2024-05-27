import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import FriendsList from '../../../components/Friends';
import Typography from '../../../atoms/Typography';

const userID = '3';

function Friends(): JSX.Element {
    return (
        <View style={styles.container}>
            <Typography variant="title" style={styles.header}>
                My Friends
            </Typography>
            <TouchableOpacity style={styles.addFriend}>
                <AntDesign name="adduser" size={24} color="black" />
            </TouchableOpacity>
            <FriendsList userId={userID} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    addFriend: {
        position: 'absolute',
        right: 10,
        top: 10,
        padding: 10,
    },
});

export default Friends;
