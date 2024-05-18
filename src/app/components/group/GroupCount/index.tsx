import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { usePostsByMyGroup } from '../../../hooks/api/post/usePostsByMyGroup';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export type MyGroupListProps = {
    userID: string;
};

const GroupCount: React.FC<MyGroupListProps> = ({ userID }) => {
    // Get user's groups
    const { data: myGroups } = usePostsByMyGroup(userID);
    const groupCount = myGroups ? myGroups.data.length : 0;

    return (
        <View style={styles.container}>
            <View style={styles.groupInfo}>
                <Text style={styles.text}>My Groups</Text>
                <FontAwesome name="group" size={24} color="black" />
                <Text style={styles.count}>{groupCount}</Text>
            </View>
            <TouchableOpacity style={styles.addIcon}>
                <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    groupInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 5,
        marginRight: 10,
    },
    text: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
        fontWeight: 'bold',
    },
    count: {
        fontSize: 18,
        marginLeft: 5,
        marginRight: 5,
    },
    addIcon: {
        marginLeft: 10,
        marginRight: 5,
    },
});

export default GroupCount;
