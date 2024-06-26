import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { List } from '../../../atoms/List';
import { useMyGroup } from '../../../hooks/api/group/useMyGroup';
import { ImageSrcUrl } from '../../../utils/images';

export type MyGroupListIconProps = {
    onGroupSelect: (groupId: string, groupName: string) => void;
    selectedGroup: string;
    selectedGroupName: string;
};

const MyGroupListIcon: React.FC<MyGroupListIconProps> = function ({ onGroupSelect, selectedGroup, selectedGroupName }) {
    const { data: myGroups } = useMyGroup();

    if (myGroups) {
        return (
            <List variant="horizontal">
                {myGroups.data.map(group => (
                    <TouchableOpacity
                        key={group.id}
                        onPress={() => onGroupSelect(group.id.toString(), group.attributes.name)}>
                        <View>
                            <Image
                                source={ImageSrcUrl.default_gp as ImageSourcePropType}
                                style={[
                                    styles.imageContainer,
                                    group.attributes.name === selectedGroupName
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
