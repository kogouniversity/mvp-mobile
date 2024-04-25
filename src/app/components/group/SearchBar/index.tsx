/* eslint-disable global-require */
import React, { useState } from 'react';
import { Feather, Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, FlatList, TouchableOpacity, Keyboard } from 'react-native';
import { Group, GroupSearchResponse } from './types';
import { List } from '../../../atoms/List';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import useSearchGroup from '../../../hooks/api/group/useSearchGroup';
import GroupPreview from '../GroupPreview';
import Skeleton from '../../../atoms/Skeleton';

const SearchBar: React.FC = function (): JSX.Element {
    const [input, setInput] = useState('');
    const [currentKeyword, setCurrentKeyword] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const { data, loading } = useSearchGroup(currentKeyword, {}) as {
        data: GroupSearchResponse | null;
        loading: boolean;
    };

    const handleSearch = (searchTerm = input) => {
        if (searchTerm.trim()) {
            if (!searchHistory.includes(searchTerm)) {
                setSearchHistory([searchTerm, ...searchHistory]);
            }
            setCurrentKeyword(searchTerm);
            setInput('');
            setShowHistory(false);
        }
    };

    const handleCancel = () => {
        setInput('');
        setShowHistory(false);
        Keyboard.dismiss();
    };

    const handleBackPress = () => {
        setInput('');
        setCurrentKeyword('');
        setShowHistory(true);
    };

    const deleteSearchHistory = () => {
        setSearchHistory([]);
    };

    const deleteHistoryItem = (index: number) => {
        setSearchHistory(searchHistory.filter((_, i) => i !== index));
    };

    const handleHistoryItemClick = (item: string) => {
        setInput(item);
        handleSearch(item);
    };

    const handleGroupSelect = (groupid: string) => {};

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                {currentKeyword && (
                    <Ionicons
                        name="arrow-back"
                        size={27}
                        color="#000000"
                        onPress={handleBackPress}
                        style={styles.backButton}
                    />
                )}
                <TextField
                    variant="outlined"
                    onChangeText={setInput}
                    value={input}
                    placeholder="Search Groups"
                    onFocus={() => setShowHistory(true)}
                    onSubmitEditing={() => handleSearch()}
                    style={styles.textField}
                />
                {showHistory && (
                    <Button
                        variant="tertiary"
                        size="md"
                        label="Cancel"
                        onPress={handleCancel}
                        style={styles.cancelButton}
                    />
                )}
            </View>
            {showHistory && (
                <View>
                    <View style={styles.latestSearchContainer}>
                        <Typography variant="text">Latest Search</Typography>
                        <Button
                            variant="tertiary"
                            size="md"
                            label="Delete All"
                            onPress={deleteSearchHistory}
                            style={styles.deleteAllButton}
                        />
                    </View>
                    <FlatList
                        data={searchHistory}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.historyItem}>
                                <TouchableOpacity
                                    onPress={() => handleHistoryItemClick(item)}
                                    style={styles.historyTextContainer}>
                                    <Typography variant="text">{item}</Typography>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteHistoryItem(index)}>
                                    <Feather name="x" size={24} color="black" style={styles.deleteButton} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}
            {loading && (
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    {Array.from(new Array(3)).map((_, idx) => (
                        <Skeleton
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx}
                            variant="rectangular"
                            width={390}
                            height={70}
                            style={{ marginBottom: 10 }}
                        />
                    ))}
                </View>
            )}
            <View>
                {!showHistory && !loading && currentKeyword && data && data.data && (
                    <List variant="vertical">
                        {data.data.map((group: Group) => (
                            <GroupPreview
                                key={group.id}
                                width={390}
                                height={70}
                                imageLink={
                                    group.attributes.icon.data
                                        ? { uri: group.attributes.icon.data }
                                        : require('../../../assets/images/group.png')
                                }
                                groupName={group.attributes.name}
                                groupDescription={group.attributes.description}
                                numOfMembers={group.attributes.userCount}
                                onPress={() => handleGroupSelect(group.id)}
                            />
                        ))}
                    </List>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    latestSearchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },

    textField: {
        flex: 1,
    },
    backButton: {
        marginRight: 10,
    },
    cancelButton: {
        justifyContent: 'center',
        width: 70,
    },

    deleteAllButton: {
        alignSelf: 'flex-end',
    },
    historyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
    },
    historyTextContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    deleteButton: {},
});

export default SearchBar;
