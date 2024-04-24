import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { List } from '../../../atoms/List';
import { useMyGroup } from '../../../hooks/api/group/useMyGroup';
import { ImageSrcUrl } from '../../../utils/images';

export type MyGroupListIconProps = {
    userId: string;
    onGroupSelect: (groupName: string) => void;
    selectedGroup: string;
};

const MyGroupListIcon: React.FC<MyGroupListIconProps> = function ({ userId, onGroupSelect, selectedGroup }) {
    const { data: myGroups } = useMyGroup(userId);

    if (myGroups) {
        return (
            <List variant="horizontal">
                {myGroups.data.map(group => (
                    <TouchableOpacity key={group.id} onPress={() => onGroupSelect(group.attributes.name)}>
                        <View>
                            <Image
                                source={
                                    (group.attributes.icon.data
                                        ? group.attributes.icon.data.attributes.url
                                        : ImageSrcUrl.default_gp) as ImageSourcePropType
                                }
                                style={[
                                    styles.imageContainer,
                                    group.attributes.name === selectedGroup
                                        ? styles.selectedGroupContainer
                                        : styles.nonSelectedGroupContainer,
                                ]}
                            />
                        </View>
                    </TouchableOpacity>
                ))}
            </List>
        );
    }
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        width: 45,
        height: 45,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 10,
    },
    selectedGroupContainer: {
        borderColor: 'black',
    },
    nonSelectedGroupContainer: {
        opacity: 0.5,
        width: 45,
        height: 45,
        backgroundColor: '#acacac',
        borderRadius: 50,
    },
});

export default MyGroupListIcon;
