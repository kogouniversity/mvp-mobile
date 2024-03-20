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
    const { data: myGroups } = useMyGroup(userId);
    if (myGroups) {
        return (
            <View>
                {myGroups && (
                    <List>
                        {myGroups.data.map(group => (
                            <ListItem style={styles.verticalList} key={group.id}>
                                <GroupPreview
                                    width={390}
                                    height={74}
                                    imageLink={
                                        group.attributes.icon.data
                                            ? group.attributes.icon.data.attributes.url
                                            : ImageSrcUrl.default_gp
                                    }
                                    groupName={group.attributes.name}
                                    groupDescription={group.attributes.description}
                                    numOfMembers={group.attributes.userCount}
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
    } else {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
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
