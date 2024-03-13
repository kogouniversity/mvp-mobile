import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { List, ListItem } from '../../../atoms/List';
import { useMyGroup } from '../../../hooks/api/group/useMyGroup';
import GroupPreview from '../GroupPreview';
import { ImageSrcUrl } from '../../../utils/images';

export type MyGroupListProps = {
    userId: string;
};

const MyGroupList: React.FC<MyGroupListProps> = function ({ userId }) {
    // Get user's groups
    const { data: myGroups, isLoading: groupsLoading } = useMyGroup(userId);
    
    return (
    <View>
        {groupsLoading && <Text>Loading...</Text>}
        {myGroups && (
            <List>
                {myGroups.data.map(group => (
                    <ListItem style={styles.verticalList} key={group.id}>
                        <GroupPreview
                            width={390}
                            height={74}
                            imageLink={ImageSrcUrl.chick}
                            groupName={group.attributes.name}
                            groupDescription={group.attributes.description}
                            numOfMembers={group.attributes.users.data.length}
                            onPress={() => {
                                console.log(`${group.attributes.name} pressed!`);
                            }}
                        />
                    </ListItem>
                ))}
            </List>
        )}
    </View>
    );
};

const styles = StyleSheet.create({
    verticalList: {
        borderBottomWidth: 0.5,
        borderColor: '#d3d3d3',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default MyGroupList;
