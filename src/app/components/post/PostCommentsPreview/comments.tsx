import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useGetCommentsByPostID } from '../../../hooks/api/post/useGetCommentsByPostID';
import { useAddComment } from '../../../hooks/api/post/useAddComments';
import { useAddCommentLike } from '../../../hooks/api/likes/useAddCommentLike';
import { useDelteCommentLike } from '../../../hooks/api/likes/useDeleteCommentLike';
import { useCommentLikeCheck } from '../../../hooks/api/likes/useLikeCheck';
import { ListItem } from '../../../atoms/List';
import { ScrollableList } from '../../../atoms/ScrollableList';
import { ImageSrcUrl } from '../../../utils/images';
import { Comment } from './types';

const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    const weeks = Math.floor(diff / (86400000 * 7));
    const months = Math.floor(diff / (86400000 * 30));
    const years = Math.floor(diff / (86400000 * 365));

    if (minutes < 1) {
        return 'Just now';
    } else if (minutes < 60) {
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

const CommentItem: React.FC<{ comment: Comment; showReplies: (comment: Comment) => void; isReply?: boolean }> = ({
    comment,
    showReplies,
    isReply = false,
}) => {
    const { attributes } = comment;
    const { data: likeCheck, isLoading } = useCommentLikeCheck(comment.id.toString());
    const [liked, setLiked] = useState(likeCheck == 1);
    const [likeCount, setLikeCount] = useState(attributes.likes || 0);

    useEffect(() => {
        if (likeCheck !== undefined) {
            setLiked(likeCheck === 1);
        }
    }, [likeCheck]);
    const { mutate: likeComment } = useAddCommentLike();
    const { mutate: unlikeComment } = useDelteCommentLike();

    const toggleLike = () => {
        if (liked) {
            setLiked(false);
            setLikeCount(prev => prev - 1);
            unlikeComment({ commentId: comment.id.toString() });
        } else {
            setLiked(true);
            setLikeCount(prev => prev + 1);
            likeComment({ commentId: comment.id.toString() });
        }
    };
    if (isLoading) {
        return null;
    }

    return (
        <View style={styles.commentContainer}>
            <View style={styles.commentHeader}>
                <Image source={ImageSrcUrl.default_gp} style={styles.profileImage} />
                <View style={styles.nameAndTimestamp}>
                    <Text style={styles.anonymousName}>Anonymous</Text>
                    <Text style={styles.userName}>{attributes.authorName}</Text>
                    <Text style={styles.timestamp}>{formatDate(new Date(attributes.createdAt))}</Text>
                </View>
                <View style={styles.likesContainer}>
                    <TouchableOpacity onPress={toggleLike}>
                        <AntDesign name={liked ? 'heart' : 'hearto'} size={12} color="#B10606" />
                    </TouchableOpacity>
                    <Text style={styles.likes}>{likeCount}</Text>
                </View>
            </View>
            <Text style={styles.commentContent}>{attributes.content}</Text>
            <View style={styles.commentActions}>
                {!isReply && (
                    <TouchableOpacity onPress={() => showReplies(comment)}>
                        <Text style={styles.actionButton}>Comment</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity>
                    <Text style={styles.actionButton}>Report</Text>
                </TouchableOpacity>
            </View>
            {attributes.replyComment && attributes.replyComment.data.length > 0 && (
                <View style={styles.subCommentsContainer}>
                    <TouchableOpacity onPress={() => showReplies(comment)}>
                        <Text style={styles.replyButton}>{`${attributes.replyComment.data.length} replies`}</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const CommentsList: React.FC<{ postID?: string; comments?: Comment[] }> = ({ postID, comments }) => {
    const [sortOption, setSortOption] = useState('likes:desc');
    const [showingReplies, setShowingReplies] = useState(false);
    const [parentComment, setParentComment] = useState<Comment | null>(null);
    const [text, setText] = useState('');
    const [tempReplies, setTempReplies] = useState<Comment[]>([]);
    const queryClient = useQueryClient();

    const { data, refetch } = useGetCommentsByPostID(postID ?? '', sortOption);
    const addCommentMutation = useAddComment();

    useEffect(() => {
        refetch();
    }, []);

    const commentData: Comment[] = comments ?? data?.data ?? [];
    const mainComments = commentData.filter(comment => !comment.attributes.parentComment?.data);

    const handleSortChange = (option: 'likes:desc' | 'createdAt:desc') => {
        setSortOption(option);
        refetch();
    };

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {};

    const showReplies = (comment: Comment) => {
        refetch();
        setParentComment(comment);
        setShowingReplies(true);
    };

    const showComments = () => {
        refetch();
        setShowingReplies(false);
        setParentComment(null);
        setTempReplies([]);
    };

    const renderCommentItem = (comment: Comment, isReply = false) => (
        <ListItem key={comment.id.toString()}>
            <CommentItem comment={comment} showReplies={showReplies} isReply={isReply} />
        </ListItem>
    );

    const handleSend = async () => {
        if (showingReplies && parentComment) {
            const newComment: Comment = {
                id: Date.now(),
                attributes: {
                    content: text,
                    likes: 0,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    authorName: '',
                    replyComment: { data: [] },
                    post: {
                        data: {
                            id: Number(postID),
                            attributes: {
                                title: '',
                                content: '',
                                likes: 0,
                                commentCount: 0,
                                createdAt: '',
                                updatedAt: '',
                                publishedAt: '',
                            },
                        },
                    },
                    parentComment: { data: [parentComment] },
                },
            };

            setTempReplies([...tempReplies, newComment]);

            try {
                await addCommentMutation.mutateAsync({
                    content: text,
                    postId: postID ?? '',
                    parentCommentId: parentComment.id.toString(),
                });
                setText('');
                refetch();
            } catch (error) {
                console.error('Error sending comment:', error);
            }
        } else {
            try {
                await addCommentMutation.mutateAsync({
                    content: text,
                    postId: postID ?? '',
                });
                setText('');
                refetch();
            } catch (error) {
                console.error('Error sending comment:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={80}>
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        {showingReplies && (
                            <TouchableOpacity onPress={showComments}>
                                <AntDesign name="left" size={27} color="black" />
                            </TouchableOpacity>
                        )}
                        <Text style={styles.headerTitle}>{showingReplies ? 'Replies' : 'Comments'}</Text>
                    </View>
                    {!showingReplies && (
                        <View style={styles.filterContainer}>
                            <TouchableOpacity
                                style={[styles.filterButton, sortOption === 'likes:desc' && styles.activeFilter]}
                                onPress={() => handleSortChange('likes:desc')}>
                                <View style={[styles.circle, sortOption === 'likes:desc' && styles.activeCircle]} />
                                <Text style={styles.filterText}>Top</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.filterButton, sortOption === 'createdAt:desc' && styles.activeFilter]}
                                onPress={() => handleSortChange('createdAt:desc')}>
                                <View style={[styles.circle, sortOption === 'createdAt:desc' && styles.activeCircle]} />
                                <Text style={styles.filterText}>Newest</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <ScrollableList variant="vertical" style={styles.commentsList} onScroll={handleScroll}>
                    {showingReplies && parentComment && (
                        <View>
                            {renderCommentItem(parentComment)}
                            {parentComment.attributes.replyComment.data.map((reply: Comment) => (
                                <View key={reply.id} style={styles.replyContainer}>
                                    {renderCommentItem(reply, true)}
                                </View>
                            ))}
                            {tempReplies.map(reply => (
                                <View key={reply.id} style={styles.replyContainer}>
                                    {renderCommentItem(reply, true)}
                                </View>
                            ))}
                        </View>
                    )}
                    {!showingReplies && mainComments.map(comment => renderCommentItem(comment))}
                </ScrollableList>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={showingReplies ? 'Add a reply...' : 'Add a comment...'}
                        value={text}
                        onChangeText={setText}
                    />
                    <TouchableOpacity onPress={handleSend}>
                        <Ionicons name="send" size={24} color="blue" />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        zIndex: 1,
        width: '100%',
        height: 60,
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 3,
    },
    activeCircle: {
        borderColor: 'hotpink',
        backgroundColor: 'hotpink',
    },
    activeFilter: {
        borderColor: 'hotpink',
    },
    filterText: {
        fontSize: 10,
        color: 'black',
    },
    activeButton: {
        color: '#000',
        fontWeight: 'bold',
    },
    commentsList: {
        padding: 10,
        flex: 1,
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
    nameAndTimestamp: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'black',
        marginRight: 5,
    },
    anonymousName: {
        color: 'black',
        marginRight: 5,
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
    backButton: {
        fontSize: 16,
        color: '#0000ff',
        marginVertical: 10,
    },
    replyContainer: {
        marginLeft: 20,
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        padding: 10,
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        marginRight: 10,
    },
});

export default CommentsList;
