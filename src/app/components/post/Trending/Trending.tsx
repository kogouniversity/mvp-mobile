import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useGetTrending } from '../../../hooks/api/post/useGetTrending';
import { List } from '../../../atoms/List';
import { GroupPostsProps, PostData } from './types';
import { ImageSrcUrl } from '../../../utils/images';
import { FontAwesome6 } from '@expo/vector-icons';
import TrendingPreview from '../TrendingPreview';
import Skeleton from '../../../atoms/Skeleton';

const Trending: React.FC<GroupPostsProps> = function ({ userID }) {
    const { data: queryData, isLoading, isError } = useGetTrending(userID);

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
            <View>
                <View style={styles.trendingHeader}>
                    <FontAwesome6 name="fire" size={24} color="red" />
                    <Text style={styles.trendingText}>Trending Now</Text>
                </View>

                <TrendingPreview
                    // key={item.id}
                    // width={390}
                    // height={74}
                    // imagesUrl={[]}
                    // imageLink={ImageSrcUrl.sfu}
                    // groupName={item.attributes.group?.data.attributes.name}
                    // title={item.attributes.title}
                    // contentPreview={contentPreview}
                    // timestamp={new Date(item.attributes.createdAt)}
                    // numOfLikes={10}
                    // numOfComments={5}
                    // userName="Anonymous"
                    // authorSchoolName="SFU"
                    // onPress={() => Alert.alert('Post pressed', `${item.id}`)}
                    key={3}
                    width={390}
                    height={74}
                    imagesUrl={[]}
                    imageLink={ImageSrcUrl.sfu}
                    groupName={'테스트 드간다잉'}
                    title={'네비게이터 엘리게이터'}
                    contentPreview={'아몰랑'}
                    timestamp={new Date()}
                    numOfLikes={10}
                    numOfComments={5}
                    userName="Anonymous"
                    authorSchoolName="SFU"
                    onPress={() => Alert.alert('Post pressed', `${item.id}`)}
                />
            </View>
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
    trendingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    trendingText: {
        fontSize: 18,
        marginLeft: 5,
        fontWeight: 'bold',
    },
});

export default Trending;
