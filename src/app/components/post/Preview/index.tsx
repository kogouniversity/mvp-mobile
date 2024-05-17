import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { PostPreviewProps } from './types';

const PostPreview: React.FC<PostPreviewProps> = ({
    width,
    imagesUrl,
    imageLink,
    groupName,
    title,
    contentPreview,
    timestamp,
    numOfLikes,
    numOfComments,
    userName,
    onPress,
}) => {
    const formatDate = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const [placeholderImages, setplaceholderImages] = useState(new Array(imagesUrl.length).fill(false));

    const renderImages = () => {
        return imagesUrl.slice(0, 2).map((url, index) => (
            <Image
                key={index}
                source={placeholderImages[index] ? require('../../../assets/images/placeholder.png') : { uri: url }}
                style={styles.postImage}
                onError={() => {
                    let newFallbacks = [...placeholderImages];
                    newFallbacks[index] = true;
                    setplaceholderImages(newFallbacks);
                }}
            />
        ));
    };

    return (
        <View style={{ width, paddingVertical: 10 }}>
            <Text style={styles.groupName}>{groupName}</Text>
            <View style={styles.line}></View>
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={styles.userSection}>
                    <Image source={imageLink} style={styles.image} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.timestamp}>{formatDate(timestamp)}</Text>
                    </View>
                </View>
                <View style={styles.contentSection}>
                    <Text style={styles.title}>{title}</Text>
                    {imagesUrl.length > 0 && <View style={styles.imagesContainer}>{renderImages()}</View>}
                    <View style={styles.contentAndFooterRow}>
                        <Text style={styles.contentPreview}>{contentPreview}</Text>
                        <View style={styles.footerRow}>
                            <AntDesign name="hearto" size={12} color="#B10606" />
                            <Text style={styles.iconText}>{numOfLikes}</Text>
                            <Ionicons name="chatbox-outline" size={12} color="#5A5A5A" />
                            <Text style={styles.iconText}>{numOfComments}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    groupName: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        marginLeft: 20,
        textAlign: 'left',
    },
    line: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginLeft: 10,
    },
    userInfo: {
        marginLeft: 10,
    },
    userName: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#000',
    },
    timestamp: {
        fontSize: 8,
        color: '#666',
    },
    contentSection: {
        marginLeft: 20,
        paddingTop: 5,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 2,
        color: '#000',
    },
    contentAndFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentPreview: {
        fontSize: 12,
        color: '#888',
        flex: 1,
    },
    footerRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 11,
        marginHorizontal: 2,
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 5,
    },
    postImage: {
        width: 100,
        height: 100,
        marginRight: 5,
        borderRadius: 10,
        backgroundColor: '#ccc',
    },
});

export default PostPreview;
