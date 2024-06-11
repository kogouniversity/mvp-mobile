import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
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
        width: 48,
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
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    spacer: {
        width: 48,
    },
});

function MyGroupList(): JSX.Element {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity style={styles.backButton} />
                    <Typography variant="title" style={styles.header}>
                        My Groups
                    </Typography>
                    <View style={styles.spacer} />
                </View>
                <MyGroupListComponent />
            </View>
        </SafeAreaView>
    );
}

export default MyGroupList;
