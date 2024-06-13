import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetPostByUserName } from '../../../hooks/api/post/useMyPosts';
import Preview from '../Preview';
import Skeleton from '../../../atoms/Skeleton';
import { List } from '../../../atoms/List';
import { PostData, ListPostResponse } from './types';
import { ImageSrcUrl } from '../../../utils/images';

interface MyPostFeedProps {
    onPostPress: (postID: string) => void;
}

const MyPostFeed: React.FC<MyPostFeedProps> = function ({ onPostPress }) {
    const { data: queryData, isLoading, isError } = useGetPostByUserName();

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData) {
        return <Text style={styles.errorText}>You have not posted yet!</Text>;
    }

    const data = (queryData as unknown as ListPostResponse).data;

    const renderPost = ({ item }: { item: PostData }) => {
        const { id, attributes } = item;
        const { title, content, createdAt, group } = attributes;
        const groupName = group?.data?.attributes?.name || 'Unknown Group';
        const isSchool = group?.data?.attributes?.isSchool ? 'School' : 'Non-School';

        return (
            <Preview
                key={id}
                width={390}
                height={74}
                imagesUrl={[]}
                imageLink={ImageSrcUrl.sfu}
                groupName={groupName}
                title={title}
                contentPreview={content}
                timestamp={new Date(createdAt)}
                numOfLikes={10}
                numOfComments={5}
                userName="Anonymous"
                authorSchoolName={isSchool}
                onPress={() => onPostPress(id.toString())}
            />
        );
    };

    return (
        <View style={styles.listContainer}>
            <List>{data.map(item => renderPost({ item }))}</List>
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        padding: 10,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
    },
    listContainer: {
        width: '100%',
    },
});

export default MyPostFeed;
