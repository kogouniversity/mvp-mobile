import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GroupPreviewProps } from './types';

const GroupPreview: React.FC<GroupPreviewProps> = function ({
    width,
    height,
    imageLink,
    groupName,
    groupDescription,
    numOfMembers,
    onPress = () => {},
}) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, { width, height }]}>
            <View style={styles.leftContainer}>
                <View style={styles.imageContainer}>
                    <Image source={imageLink} style={styles.image} />
                </View>
            </View>
            <View style={styles.rightContainer}>
                <View>
                    <Text style={styles.nameText}>{groupName}</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.desText}>
                        {groupDescription}
                    </Text>
                    <View style={styles.memberContainer}>
                        <Ionicons name="person-outline" size={10} color="#5A5A5A" style={styles.memberIcon} />
                        <Text style={styles.memberText}>{numOfMembers} members</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    leftContainer: {
        flex: 2,
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 8,
        justifyContent: 'center',
    },
    imageContainer: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 10,
    },
    image: {
        width: 25,
        height: 25,
    },
    nameText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    desText: {
        fontSize: 11,
        marginLeft: 8,
    },
    memberContainer: {
        flexDirection: 'row',
        marginLeft: 13,
    },
    memberIcon: {
        marginTop: 1.5,
    },
    memberText: {
        fontSize: 11,
        color: '#5a5a5a',
    },
});

export default GroupPreview;
