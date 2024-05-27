import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MyGroupListComponent from '../../../components/group/MyGroupList';
import Typography from '../../../atoms/Typography';

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    backButton: {
        marginLeft: -15,
        alignSelf: 'center',
    },
    header: {
        textAlign: 'center',
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
    },
    field: {
        width: '100%',
        margin: 25,
    },
});

function MyGroupList(): JSX.Element {
    const userId: string = '3'; // Define userId here
    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={styles.backButton} />
                <Typography variant="title" style={styles.header}>
                    My Groups
                </Typography>
                <View style={{ width: 48 }} />
            </View>
            <MyGroupListComponent userId={userId} />
        </View>
    );
}

export default MyGroupList;
