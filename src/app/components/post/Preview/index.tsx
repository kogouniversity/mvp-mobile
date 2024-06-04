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
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        const weeks = Math.floor(diff / (86400000 * 7));
        const months = Math.floor(diff / (86400000 * 30));
        const years = Math.floor(diff / (86400000 * 365));

          if (minutes < 1){
            return 'Just now'
        }
          else if (minutes < 60) {
            return `${minutes}m`;
        } else if (hours < 24) {
            return `${hours}h`;
        } else if (days < 7) {
            return `${days}d`;
        } else if (weeks < 4) {
            return `${weeks}w`;
        } else if (months < 12) {
            return `${months}mo`;
        } else {
            return `${years}y`;
        }
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
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={styles.userSection}>
                    <Image source={imageLink} style={styles.image} />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.timestamp}> {formatDate(new Date(timestamp))}</Text>
                    </View>
                </View>
                <View style={styles.contentSection}>
                    <Text style={styles.title}>{title}</Text>
                    {imagesUrl.length > 0 && <View style={styles.imagesContainer}>{renderImages()}</View>}
                    <View style={styles.contentAndFooterRow}>
                        <Text style={styles.contentPreview}>{contentPreview}</Text>
                    </View>
                    <View style={styles.footerRow}>
                        <View style={styles.groupNameContainer}>
                            <Text style={styles.groupName}>{groupName}</Text>
                        </View>
                        <View style={styles.likesComments}>
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
    groupNameContainer: {
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 1,
    },
    groupName: {
        fontSize: 10,
        color: '#000',
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
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
    },
    userName: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#000',
        marginRight: 5,
    },
    timestamp: {
        fontSize: 10,
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
        marginTop: 10,
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
    likesComments: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
});

export default PostPreview;
