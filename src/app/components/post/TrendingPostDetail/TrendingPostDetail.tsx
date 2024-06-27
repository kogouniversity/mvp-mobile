import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetPostByID } from '../../../hooks/api/post/useGetPostByID';
import { GroupPostsProps } from './types';
import { ImageSrcUrl } from '../../../utils/images';
import PostDetailPreview from '../PostDetailPreview';
import Skeleton from '../../../atoms/Skeleton';

const TrendingPostDetail: React.FC<GroupPostsProps> = function ({ postID }) {
    const { data: queryData, isLoading, isError } = useGetPostByID(postID);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData) {
        return <Text style={styles.errorText}>문제발생! 문제발생!</Text>;
    }

    const { data } = queryData;

    return (
        <View>
            <View key={data.id}>
                <PostDetailPreview
                    width={390}
                    height={74}
                    imagesUrl={[]}
                    imageLink={ImageSrcUrl.sfu}
                    title={data.attributes.title}
                    content={data.attributes.content}
                    timestamp={new Date(data.attributes.createdAt)}
                    numOfLikes={10}
                    numOfComments={5}
                    userName="Anonymous"
                    authorSchoolName="SFU"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        padding: 10,
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});

export default TrendingPostDetail;
