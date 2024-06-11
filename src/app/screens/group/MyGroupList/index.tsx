import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import MyGroupListComponent from '../../../components/group/MyGroupList';
import Typography from '../../../atoms/Typography';

function MyGroupList(): JSX.Element {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity style={styles.backButton} />
                    <Typography variant="title" style={styles.header}>
                        My Groups
                    </Typography>
                    <View style={styles.backButton} />
                </View>
                <MyGroupListComponent />
            </View>
        </SafeAreaView>
    );
}

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
        width: 48,
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default MyGroupList;
