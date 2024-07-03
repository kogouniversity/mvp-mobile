import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import CommentsList from '../../../components/post/PostCommentsPreview/comments';
import { PostDetailsNavigationProp, NavigationParamList } from '../../../navigator/types';
import { AntDesign } from '@expo/vector-icons';
import TrendingPostDetail from '../../../components/post/TrendingPostDetail/TrendingPostDetail';
import { useGetPostWithGroupByID } from '../../../hooks/api/group/useGetGroupInfoWithPostID';
import Button from '../../../atoms/Button';
import { useAuthGroupID } from '../../../hooks/api/auth/useAuthToken';
import Skeleton from '../../../atoms/Skeleton';
import { useUnfollowGroup } from '../../../hooks/api/group/useUnfollowGroup';

type TrendingPostDetailRouteProp = RouteProp<NavigationParamList, 'TrendingPostDetails'>;

function TrendingPostDetails(): JSX.Element {
    const route = useRoute<TrendingPostDetailRouteProp>();
    const navigation = useNavigation<PostDetailsNavigationProp>();
    const { postID } = route.params;

    const { data, isLoading } = useGetPostWithGroupByID(postID);
    const userGroupIds = useAuthGroupID() ?? [];
    const [groupName, setGroupName] = useState<string>('');
    const [groupId, setGroupId] = useState<number | null>(null);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const { mutate: unfollowGroup } = useUnfollowGroup(groupId?.toString() || '');

    useEffect(() => {
        if (data && userGroupIds) {
            const groupId = data.data.attributes.group.data.id;
            setGroupName(data.data.attributes.group.data.attributes.name);
            setGroupId(groupId);
            setIsFollowing(userGroupIds.includes(groupId));
        }
    }, [data, userGroupIds]);

    const handleBackPress = () => {
        navigation.navigate('FeedTab', {
            savedActiveTab: 'Trending',
        });
    };

    const handleFollowPress = () => {
        if (groupId && !isFollowing) {
            navigation.navigate('JoinGroupScreen', { groupId: groupId.toString() });
        } else if (isFollowing) {
            Alert.alert(
                'Unfollow Group',
                'Are you sure you want to unfollow this group?',
                [
                    {
                        text: 'No',
                        onPress: () => console.log('cancel'),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes',
                        onPress: () => {
                            unfollowGroup();
                            setIsFollowing(false);
                        },
                    },
                ],
                { cancelable: false },
            );
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View>
                    <Skeleton variant="rounded" width={350} height={74} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={handleBackPress}>
                    <AntDesign name="left" size={27} color="black" />
                </TouchableOpacity>
                <Button
                    label={isFollowing ? 'Followed' : 'Follow'}
                    variant="primary"
                    size="sm"
                    onPress={handleFollowPress}
                    style={isFollowing ? styles.followedButton : styles.followButton}
                />
            </View>
            <View style={styles.groupContainer}>
                <Text style={styles.groupText}>{groupName}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <TrendingPostDetail postID={postID} />
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    followButton: {},
    followedButton: {
        backgroundColor: 'lightgrey',
    },
    followButtonText: {
        color: 'white',
        fontSize: 16,
    },
    groupContainer: {
        alignSelf: 'flex-start',
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginLeft: 25,
        marginTop: 10,
    },
    groupText: {
        fontSize: 12,
        color: 'black',
    },
});

export default TrendingPostDetails;
