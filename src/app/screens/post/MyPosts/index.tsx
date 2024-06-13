import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MyPostFeed from '../../../components/post/MyPostFeed/MyPostFeed';
import { PostDetailsNavigationProp } from '../../../navigator/types';
import AddButton from '../../../components/AddButton';
import Typography from '../../../atoms/Typography';
import BackButton from '../../../components/BackButton';

function MyPosts(): JSX.Element {
    const navigation = useNavigation<PostDetailsNavigationProp>();

    const handlePostPress = (postID: string) => {
        navigation.navigate('GroupPostDetails', {
            postID,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerWrapper}>
                <BackButton navigation={navigation} />
                <View style={styles.titleWrapper}>
                    <Typography variant="title" style={styles.header}>
                        My Posts
                    </Typography>
                </View>
            </View>
            <View style={styles.contentContainer}>
                <MyPostFeed onPostPress={handlePostPress} />
                <AddButton />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        marginBottom: 20,
        paddingTop: 10,
        position: 'relative',
    },
    titleWrapper: {
        position: 'absolute',
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
});

export default MyPosts;
