import React from 'react';
import { StyleSheet } from 'react-native';

import SearchBar from '../../components/group/SearchBar';

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    backButton: {
        zIndex: 1,
    },
    searchBarContainer: {
        flex: 1,
    },
});

function GroupSearchScreen(): JSX.Element {
    return <SearchBar />;
}

export default GroupSearchScreen;
