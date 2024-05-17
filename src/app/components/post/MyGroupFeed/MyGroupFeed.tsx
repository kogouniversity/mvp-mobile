import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { usePostsByMyGroup } from '../../../hooks/api/post/usePostsByMyGroup';
import Preview from '../Preview';
import Skeleton from '../../../atoms/Skeleton';
import { List } from '../../../atoms/List';
import { GroupPostsProps, PostData, OptionType } from './types';
import { ImageSrcUrl } from '../../../utils/images';

const MyGroupFeed: React.FC<GroupPostsProps> = function ({ userID }) {
    const { data: queryData, isLoading, isError } = usePostsByMyGroup(userID);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData) {
        return <Text style={styles.errorText}>Group not found or data is unavailable</Text>;
    }

    const { data } = queryData;

    const renderPost = ({ item }: { item: PostData }) => {
        const contentPreview = Array.isArray(item.attributes.content)
            ? item.attributes.content.map(content => content.children.map(child => child.text).join(' ')).join(' ')
            : '';

        return (
            <Preview
                key={item.id}
                width={390}
                height={74}
                imagesUrl={[]}
                imageLink={ImageSrcUrl.sfu}
                groupName={item.attributes.group?.data.attributes.name}
                title={item.attributes.title}
                contentPreview={contentPreview}
                timestamp={new Date(item.attributes.createdAt)}
                numOfLikes={10}
                numOfComments={5}
                userName="Ananymous"
                authorSchoolName="SFU"
                onPress={() => Alert.alert('Post pressed', `${item.id}`)}
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
        color: 'red',
        textAlign: 'center',
    },
});

export default MyGroupFeed;
