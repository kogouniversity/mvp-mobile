import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { List, ListItem } from '../../../atoms/List';
import { useMyGroup } from '../../../hooks/api/group/useMyGroup';
import GroupPreview from '../GroupPreview';
import { ImageSrcUrl } from '../../../utils/images';
import DraggableListItem from '../../DragList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../../navigator/types';

export type MyGroupListProps = {};

const MyGroupList: React.FC<MyGroupListProps> = function () {
    const { data: myGroups, refetch } = useMyGroup();
    const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList>>();

    const handleLeavePress = () => {
        refetch();
    };

    if (myGroups) {
        return (
            <View style={styles.container}>
                <List>
                    {myGroups.data.map(group => (
                        <DraggableListItem
                            key={group.id}
                            groupId={group.id.toString()}
                            onLeavePress={handleLeavePress}>
                            <ListItem style={styles.verticalList}>
                                <GroupPreview
                                    width={390}
                                    height={74}
                                    imageLink={ImageSrcUrl.default_gp}
                                    groupName={group.attributes.name}
                                    groupDescription={group.attributes.description}
                                    numOfMembers={group.attributes.userCount}
                                    onPress={() => {
                                        navigation.navigate('GroupFeed', { groupId: group.id.toString() });
                                    }}
                                />
                            </ListItem>
                        </DraggableListItem>
                    ))}
                </List>
            </View>
        );
    }

    return (
        <View style={styles.loadingContainer}>
            <Text>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    verticalList: {
        borderBottomWidth: 0.5,
        borderColor: '#d3d3d3',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MyGroupList;
