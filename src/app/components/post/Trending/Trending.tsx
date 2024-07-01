import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useGetTrending } from '../../../hooks/api/post/useGetTrending';
import { List } from '../../../atoms/List';
import { GroupPostsProps, PostData } from './types';
import { ImageSrcUrl } from '../../../utils/images';
import { FontAwesome6 } from '@expo/vector-icons';
import TrendingPreview from '../TrendingPreview';
import Skeleton from '../../../atoms/Skeleton';
import { useNavigation } from '@react-navigation/native';
import { NavigationParamList } from '../../../navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TrendingNavigationProp = NativeStackNavigationProp<NavigationParamList, 'TrendingPostDetails'>;

const Trending: React.FC<GroupPostsProps> = function ({ userID }) {
    const navigation = useNavigation<TrendingNavigationProp>();
    const { data: queryData, isLoading, isError } = useGetTrending(userID);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !queryData) {
        return <Text style={styles.errorText}></Text>;
    }

    const { data } = queryData;

    const renderPost = ({ item }: { item: PostData }) => {
        const contentPreview = Array.isArray(item.attributes.content)
            ? item.attributes.content.map(content => content.children.map(child => child.text).join(' ')).join(' ')
            : item.attributes.content;

        return (
            <View key={item.id}>
                <TrendingPreview
                    key={item.id}
                    width={390}
                    height={74}
                    imagesUrl={[]}
                    imageLink={ImageSrcUrl.sfu}
                    groupName={item.attributes.group?.data.attributes.name}
                    title={item.attributes.title}
                    contentPreview={contentPreview}
                    timestamp={new Date(item.attributes.createdAt)}
                    numOfLikes={item.attributes.likes}
                    numOfComments={item.attributes.commentCount}
                    userName="Anonymous"
                    authorSchoolName="SFU"
                    postId={item.id.toString()}
                    onPress={() => navigation.navigate('TrendingPostDetails', { postID: item.id.toString() })}
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
