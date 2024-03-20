import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { usePostsByGroup } from '../../../hooks/api/post/usePostsByGroup';
import PostPreview from '../PostPreview';
import Skeleton from '../../../atoms/Skeleton';
import SelectField from '../../../atoms/SelectField';
import { List } from '../../../atoms/List';
import { GroupPostsProps, PostData, OptionType } from './types';

const GroupFeed: React.FC<GroupPostsProps> = ({ groupName }) => {
    const { data: queryData, isLoading, isError } = usePostsByGroup(groupName);
    const [selectedSort, setSelectedSort] = useState('Recent');

    const handleSortChange = (option: OptionType) => {
        setSelectedSort(option.value);
    };

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

    const data = queryData.data;

    const renderPost = ({ item }: { item: PostData }) => {
        console.log(item.attributes.content);
        const contentPreview = Array.isArray(item.attributes.content)
            ? item.attributes.content.map(content => content.children.map(child => child.text).join(' ')).join(' ')
            : '';

        return (
            <PostPreview
                key={item.id}
                width={390}
                height={74}
                imageLink={{ uri: '/image' }}
                groupName={groupName}
                title={item.attributes.title}
                contentPreview={contentPreview}
                timestamp={new Date(item.attributes.createdAt)}
                numOfLikes={10}
                numOfComments={5}
                authorSchoolName="SFU"
                onPress={() => console.log('Post pressed', item.id)}
            />
        );
    };

    return (
        <View>
            <SelectField
                label="Sort by"
                data={[
                    { label: 'Recent', value: 'Recent' },
                    { label: 'Popular', value: 'Popular' },
                ]}
                onSelect={handleSortChange}
            />
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

export default GroupFeed;
