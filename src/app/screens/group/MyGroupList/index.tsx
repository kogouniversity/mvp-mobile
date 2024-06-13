import React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import MyGroupListComponent from '../../../components/group/MyGroupList';
import Typography from '../../../atoms/Typography';
import { NavigationParamList } from '../../../navigator/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

function MyGroupList(): JSX.Element {
    const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList, 'CreateNewGroup'>>();
    const handlePress = () => {
        navigation.navigate('CreateNewGroup');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.headerWrapper}>
                    <TouchableOpacity style={styles.backButton} />
                    <Typography variant="title" style={styles.header}>
                        My Groups
                    </Typography>
                    <TouchableOpacity onPress={handlePress} style={styles.addButton}>
                        <AntDesign name="plus" size={24} color="black" />
                    </TouchableOpacity>
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
        paddingTop: 10,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    backButton: {
        width: 48,
    },
    addButton: {
        width: 48,
        alignItems: 'flex-end',
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default MyGroupList;
