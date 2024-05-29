import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useGetCommentsByPostID } from '../../../hooks/api/post/useGetCommentsByPostID';
import { List, ListItem } from '../../../atoms/List';
import { ImageSrcUrl } from '../../../utils/images';
import { Comment } from './types';

const CommentItem: React.FC<{ comment: Comment }> = ({ comment }) => {
    const { attributes } = comment;
    const [showReplies, setShowReplies] = useState(false);

    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <Image source={ImageSrcUrl.default_gp} style={styles.profileImage} />
                <Text style={styles.userName}>{attributes.authorName}</Text>
                <Text style={styles.timestamp}>{new Date(attributes.createdAt).toLocaleString()}</Text>
                <View style={styles.likesContainer}>
                    <AntDesign name="hearto" size={12} color="#B10606" />
                    <Text style={styles.likes}>{attributes.numOfLikes}</Text>
                </View>
            </View>
            <Text style={styles.commentContent}>{attributes.content}</Text>
            <View style={styles.commentActions}>
                <TouchableOpacity>
                    <Text style={styles.actionButton}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.actionButton}>Report</Text>
                </TouchableOpacity>
            </View>
            {attributes.replyComment && attributes.replyComment.data.length > 0 && (
                <View style={styles.subCommentsContainer}>
                    <TouchableOpacity onPress={() => setShowReplies(!showReplies)}>
                        <Text style={styles.replyButton}>
                            {showReplies ? 'Hide replies' : `${attributes.replyComment.data.length} replies`}
                        </Text>
                    </TouchableOpacity>
                    {showReplies && <CommentsList comments={attributes.replyComment.data} />}
                </View>
            )}
        </View>
    );
};

const CommentsList: React.FC<{ postID?: string; comments?: Comment[] }> = ({ postID, comments }) => {
    const { data, isLoading, isError } = useGetCommentsByPostID(postID ?? '');

    if (!comments && isLoading) {
        return <Text>Loading comments...</Text>;
    }

    if (!comments && isError) {
        return <Text>Failed to load comments.</Text>;
    }

    const commentData: Comment[] = comments ?? data?.data ?? [];

    return (
        <List variant="vertical">
            {commentData.map((comment: Comment) => (
                <ListItem key={comment.id.toString()}>
                    <CommentItem comment={comment} />
                </ListItem>
            ))}
        </List>
    );
};

const styles = StyleSheet.create({
    commentsList: {
        padding: 10,
    },
    commentContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    commentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    userName: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
        marginRight: 10,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    likes: {
        marginLeft: 5,
        fontSize: 12,
        color: '#B10606',
    },
    commentContent: {
        marginTop: 5,
        marginBottom: 5,
        fontSize: 14,
    },
    commentActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        fontSize: 12,
        color: '#888',
    },
    subCommentsContainer: {
        marginLeft: 20,
        marginTop: 10,
    },
    replyButton: {
        color: '#888',
        fontSize: 12,
    },
});

export default CommentsList;
