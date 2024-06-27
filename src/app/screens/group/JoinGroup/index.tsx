import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import GroupInfo from '../../../components/group/GroupInfo';
import Button from '../../../atoms/Button';
import { NavigationParamList } from '../../../navigator/types';
import { AntDesign } from '@expo/vector-icons';

type JoinGroupScreenRouteProp = RouteProp<NavigationParamList, 'JoinGroupScreen'>;

function JoinGroupScreen(): JSX.Element {
    const navigation = useNavigation();
    const route = useRoute<JoinGroupScreenRouteProp>();
    const { groupId } = route.params;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <AntDesign name="left" size={27} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.groupInfoContainer}>
                <GroupInfo groupID={groupId} />
            </View>
            <View style={styles.joinButtonContainer}>
                <Button
                    size="md"
                    label="Join to see more"
                    variant="primary"
                    onPress={() => {
                        console.log('Join Group Pressed');
                    }}
                    style={styles.joinButton}
                />
            </View>
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
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        zIndex: 1,
    },
    backButton: {
        marginRight: 10,
    },
    groupInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: '-25%',
    },
    joinButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    joinButton: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'black',
        color: 'white',
    },
});

export default JoinGroupScreen;
