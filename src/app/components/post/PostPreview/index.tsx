import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { PostPreviewProps } from './types';

const PostPreview: React.FC<PostPreviewProps> = function ({
    width,
    height,
    groupName,
    title,
    contentPreview,
    timestamp,
    numOfLikes,
    numOfComments,
    authorSchoolName,
    imageLink,
    onPress = () => {},
}) {
    const formatTimeDigits = (value: number): string =>
        value.toString().padStart(2, '0');

    const renderLikesAndComments = (count: number): number => {
        if (count > 1000) {
            return 999;
        }
        return count;
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, { width, height }]}>
            <View style={styles.leftContainer}>
                <View style={styles.groupContainer}>
                    <Image source={imageLink} style={styles.image} />
                    <Text style={styles.normalText}> {groupName}</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.normalText}>
                        {contentPreview}
                    </Text>
                </View>
            </View>
            <View style={styles.rightContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.normalText}>
                        {formatTimeDigits(timestamp.getHours())}:
                        {formatTimeDigits(timestamp.getMinutes())}
                    </Text>
                    <View style={styles.NumsContainer}>
                        <AntDesign
                            name="hearto"
                            size={12}
                            color="#B10606"
                            style={styles.icon}
                        />
                        <Text style={styles.normalText}>
                            {renderLikesAndComments(numOfLikes)}{' '}
                        </Text>
                        <Ionicons
                            name="chatbox-outline"
                            size={12}
                            color="#5A5A5A"
                            style={styles.icon}
                        />
                        <Text style={styles.normalText}>
                            {renderLikesAndComments(numOfComments)}
                        </Text>
                    </View>
                    <View style={styles.authorSchoolNameContainer}>
                        <Text style={styles.normalText}>
                            {authorSchoolName}
                        </Text>
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
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 7,
        marginTop: 2,
    },
    groupContainer: {
        flexDirection: 'row',
    },
    normalText: {
        fontSize: 11,
        color: '#5a5a5a',
        marginBottom: 2,
    },
    contentContainer: {
        paddingLeft: 17,
    },
    titleText: {
        fontSize: 13,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    image: {
        width: 10,
        height: 10,
        marginBottom: 3,
    },
    icon: {
        marginTop: 1,
    },
    rightContainer: {
        marginLeft: 'auto',
        justifyContent: 'center',
        width: 80,
        marginTop: 2,
        paddingRight: 7,
    },
    textContainer: {
        alignItems: 'flex-end',
    },
    NumsContainer: {
        flexDirection: 'row',
    },
    authorSchoolNameContainer: {
        backgroundColor: '#d3d3d3',
        borderRadius: 42,
        paddingHorizontal: 5.5,
    },
});

export default PostPreview;
