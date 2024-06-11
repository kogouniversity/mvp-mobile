import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyGroupFeed from '../../components/post/MyGroupFeed/MyGroupFeed';
import Trending from '../../components/post/Trending/Trending';
import Header from '../../components/MainScreenHeader/MainScreenHeader';
import { PostDetailsNavigationProp, NavigationParamList } from '../../navigator/types';
import { RouteProp } from '@react-navigation/native';
import AddButton from '../../components/AddButton';

function Main(): JSX.Element {
    const [activeTab, setActiveTab] = useState('Following');
    const [filter, setFilter] = useState('SFU');
    const navigation = useNavigation<PostDetailsNavigationProp>();

    const route = useRoute<RouteProp<NavigationParamList, 'FeedTab'>>();

    useEffect(() => {
        if (route.params) {
            const { savedActiveTab, savedFilter } = route.params;
            if (savedActiveTab) setActiveTab(savedActiveTab);
            if (savedFilter) setFilter(savedFilter);
        }
    }, [route.params]);

    const handlePostPress = (postID: string) => {
        navigation.navigate('PostDetails', {
            postID,
            savedActiveTab: activeTab,
            savedFilter: filter,
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <Header />
            </View>
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Following' && styles.activeTab]}
                    onPress={() => setActiveTab('Following')}>
                    <Text style={styles.tabText}>Following</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'Trending' && styles.activeTab]}
                    onPress={() => setActiveTab('Trending')}>
                    <Text style={styles.tabText}>Trending</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.spacing} />
            {activeTab === 'Trending' ? (
                <Trending userID={'3'} />
            ) : (
                <View style={styles.contentContainer}>
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'SFU' && styles.activeFilter]}
                            onPress={() => setFilter('SFU')}>
                            <View style={[styles.circle, filter === 'SFU' && styles.activeCircle]} />
                            <Text style={styles.filterText}>only SFU</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, filter === 'All' && styles.activeFilter]}
                            onPress={() => setFilter('All')}>
                            <View style={[styles.circle, filter === 'All' && styles.activeCircle]} />
                            <Text style={styles.filterText}>all groups</Text>
                        </TouchableOpacity>
                    </View>
                    <MyGroupFeed filter={filter} onPostPress={handlePostPress} />
                    <AddButton />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    headerContainer: {
        backgroundColor: 'white',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 25,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: 'red',
    },
    tabText: {
        fontSize: 16,
    },
    spacing: {
        height: 10,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    filterContainer: {
        flexDirection: 'row',
        marginVertical: 10,
        backgroundColor: 'white',
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    filterText: {
        fontSize: 10,
        marginLeft: 5,
    },
    circle: {
        width: 10,
        height: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    activeCircle: {
        borderColor: 'green',
        backgroundColor: 'green',
    },
    activeFilter: {
        borderColor: 'green',
    },
});

export default Main;
