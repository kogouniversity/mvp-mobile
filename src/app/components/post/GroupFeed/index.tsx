import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { usePostsByGroup } from '../../../hooks/api/post/usePostsByGroup';
import Preview from '../Preview';
import Skeleton from '../../../atoms/Skeleton';
import { ScrollableList, ListItem } from '../../../atoms/ScrollableList';
import { GroupPostsProps, PostData } from './types';
import { ImageSrcUrl } from '../../../utils/images';
import GroupInfo from '../../../components/group/GroupInfo';

const GroupFeedComponent: React.FC<
    GroupPostsProps & { scrollY: Animated.Value; onLoad: (name: string) => void; onPostPress: (postID: string) => void }
> = ({ groupID, scrollY, onLoad, onPostPress }) => {
    const { data: queryData, isLoading, isError } = usePostsByGroup(groupID);

    const renderHeader = () => (
        <Animated.View
            style={[
                styles.headerContainer,
                {
                    transform: [
                        {
                            translateY: scrollY.interpolate({
                                inputRange: [0, 200],
                                outputRange: [0, -130],
                                extrapolate: 'clamp',
                            }),
                        },
                    ],
                },
            ]}>
            <GroupInfo groupID={groupID} onLoad={onLoad} />
        </Animated.View>
    );

    const renderPost = ({ item }: { item: PostData }) => {
        const contentPreview = item.attributes.content;

        return (
            <Preview
                key={item.id}
                width={390}
                height={74}
                imagesUrl={[]}
                imageLink={ImageSrcUrl.sfu}
                groupName={item.attributes.group.data.attributes.name}
                title={item.attributes.title}
                contentPreview={contentPreview}
                timestamp={new Date(item.attributes.createdAt)}
                numOfLikes={item.attributes.likes}
                numOfComments={item.attributes.commentCount}
                userName="Anonymous"
                authorSchoolName={item.attributes.group.data.attributes.isSchool ? 'School' : 'Non-School'}
                postId={item.id.toString()}
                onPress={() => onPostPress(item.id.toString())}
                
            />
        );
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData || !queryData.data) {
        return <Text style={styles.errorText}></Text>;
    }

    const { data } = queryData;

    return (
        <ScrollableList
            variant="vertical"
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}>
            <ListItem>{renderHeader()}</ListItem>
            {Array.isArray(data) && data.length > 0 ? (
                data.map(item => <ListItem key={item.id}>{renderPost({ item })}</ListItem>)
            ) : (
                <ListItem>
                    <Text style={styles.errorText}>No posts available</Text>
                </ListItem>
            )}
        </ScrollableList>
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
    headerContainer: {
        marginBottom: 10,
    },
});

export default GroupFeedComponent;
