import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import PostDetail from '../../../components/post/PostDetail';
import CommentsList from '../../../components/post/PostCommentsPreview/comments';
import { PostDetailsRouteProp, PostDetailsNavigationProp } from '../../../navigator/types';
import { AntDesign } from '@expo/vector-icons';

function PostDetails(): JSX.Element {
    const route = useRoute<PostDetailsRouteProp>();
    const navigation = useNavigation<PostDetailsNavigationProp>();
    const { postID, savedActiveTab, savedFilter } = route.params;

    const handleBackPress = () => {
        navigation.navigate('FeedTab', {
            savedActiveTab,
            savedFilter,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={handleBackPress}>
                <AntDesign name="left" size={27} color="black" />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <PostDetail postID={postID} />
                <CommentsList postID={postID} />
            </View>
        </SafeAreaView>
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
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default PostDetails;
