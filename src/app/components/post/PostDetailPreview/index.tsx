import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { PostPreviewProps } from './types';
import { useAddPostLike } from '../../../hooks/api/likes/useAddPostLike';
import { useDeletePostLike } from '../../../hooks/api/likes/useDeletePostLike';

const PostDetailPreview: React.FC<PostPreviewProps> = ({
    width,
    imagesUrl,
    imageLink,
    title,
    content,
    timestamp,
    numOfLikes,
    numOfComments,
    userName,
    postId,
}) => {
    const formatDate = (date: Date) => {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const [placeholderImages, setPlaceholderImages] = useState(new Array(imagesUrl.length).fill(false));

    const renderImages = () => {
        return imagesUrl.slice(0, 2).map((url, index) => (
            <Image
                key={index}
                source={placeholderImages[index] ? require('../../../assets/images/placeholder.png') : { uri: url }}
                style={styles.postImage}
                onError={() => {
                    let newFallbacks = [...placeholderImages];
                    newFallbacks[index] = true;
                    setPlaceholderImages(newFallbacks);
                }}
            />
        ));
    };

    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(numOfLikes);

    const { mutate: likePost } = useAddPostLike();
    const { mutate: unlikePost } = useDeletePostLike();

    const toggleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(prev => prev - 1);
            unlikePost({ postId });
        } else {
            setLiked(true);
            setLikeCount(prev => prev + 1);
            likePost({ postId });
        }
    };

    return (
        <View style={[styles.container, { width }]}>
            <View style={styles.contentSection}>
                <Text style={styles.title}>{title}</Text>
                {imagesUrl.length > 0 && <View style={styles.imagesContainer}>{renderImages()}</View>}
                <Text style={styles.contentPreview}>{content}</Text>
            </View>

            <View style={styles.userSection}>
                <View style={styles.userInfoContainer}>
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.timestamp}>{formatDate(timestamp)}</Text>
                    </View>
                    <Image source={imageLink} style={styles.image} />
                </View>
            </View>

            <View style={styles.footerRow}>
                <TouchableOpacity style={styles.footerButton} onPress={toggleLike}>
                    <AntDesign name={liked ? 'heart' : 'hearto'} size={12} color="#B10606" />
                    <Text style={styles.iconText}>{likeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Ionicons name="chatbox-outline" size={12} color="#5A5A5A" />
                    <Text style={styles.iconText}>{numOfComments}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Text style={styles.reportText}>Report</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        borderColor: '#ddd',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    userInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    image: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginLeft: 10,
    },
    userInfo: {
        alignItems: 'flex-end',
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#000',
    },
    contentPreview: {
        fontSize: 14,
        color: '#888',
        marginBottom: 10,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
        borderColor: '#ddd',
        paddingTop: 5,
    },
    footerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingVertical: 5,
    },
    iconText: {
        fontSize: 11,
        marginLeft: 2,
    },
    reportText: {
        fontSize: 10,
        color: 'red',
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

export default PostDetailPreview;
