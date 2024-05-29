import React from 'react';
import { View, StyleSheet } from 'react-native';
import PostDetail from '../../../components/post/PostDetail';
import CommentsList from '../../../components/post/PostCommentsPreview/comments';

const postID = '3';

function PostDetails(): JSX.Element {
    return (
        <View style={{ flex: 1 }}>
            <PostDetail postID={postID}></PostDetail>
            <CommentsList postID={postID}></CommentsList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    spacing: {
        height: 10,
    },
});

export default PostDetails;
