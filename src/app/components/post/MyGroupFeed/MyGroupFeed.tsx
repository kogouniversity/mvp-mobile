import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePostsByMyGroup } from '../../../hooks/api/post/usePostsByMyGroup';
import Preview from '../Preview';
import Skeleton from '../../../atoms/Skeleton';
import { List } from '../../../atoms/List';
import { GroupPostsProps, PostData, ListPostResponse } from './types';
import { ImageSrcUrl } from '../../../utils/images';

interface MyGroupFeedProps {
    filter: string;
    onPostPress: (postID: string) => void;
}

const MyGroupFeed: React.FC<MyGroupFeedProps> = function ({ filter, onPostPress }) {
    const { data: queryData, isLoading, isError } = usePostsByMyGroup(filter);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    const data: PostData[] = queryData as unknown as ListPostResponse;

    const renderPost = ({ item }: { item: PostData }) => {
        const contentPreview = item.content;

        return (
            <Preview
                key={item.id}
                width={390}
                height={74}
                imagesUrl={[]}
                imageLink={ImageSrcUrl.sfu}
                groupName={item.group.name}
                title={item.title}
                contentPreview={contentPreview}
                timestamp={new Date(item.createdAt)}
                numOfLikes={10}
                numOfComments={5}
                userName="Anonymous"
                authorSchoolName={item.group.isSchool ? 'School' : 'Non-School'}
                onPress={() => onPostPress(item.id)}
            />
        );
    };

    return (
        <View>
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
});

export default MyGroupFeed;
