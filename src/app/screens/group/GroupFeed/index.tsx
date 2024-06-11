import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Animated, Text } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import GroupFeedComponent from '../../../components/post/GroupFeed';
import { NavigationParamList } from '../../../navigator/types';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AddButton from '../../../components/AddButton';

type GroupFeedRouteProp = RouteProp<NavigationParamList, 'GroupFeed'>;

function GroupFeed(): JSX.Element {
    const route = useRoute<GroupFeedRouteProp>();
    const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList, 'GroupFeed'>>();
    const { groupId } = route.params;
    const [groupName, setGroupName] = useState('');
    const scrollY = useRef(new Animated.Value(0)).current;

    const showGroupName = scrollY.interpolate({
        inputRange: [150, 200],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });
    const handlePostPress = (postID: string) => {
        navigation.navigate('GroupPostDetails', {
            postID,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View style={[styles.header]}>
                <BackButton navigation={navigation} />
                <Animated.Text style={[styles.headerTitle, { opacity: showGroupName }]}>{groupName}</Animated.Text>
            </Animated.View>
            <GroupFeedComponent
                groupID={groupId.toString()}
                scrollY={scrollY}
                onLoad={name => setGroupName(name)}
                onPostPress={handlePostPress}
            />
            <AddButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        zIndex: 1,
        paddingBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default GroupFeed;
