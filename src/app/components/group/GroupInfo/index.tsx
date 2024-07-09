import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Skeleton from '../../../atoms/Skeleton';
import { useGetGroupByID } from '../../../hooks/api/group/useGetGroupByID';

export type GroupInfoProps = {
    groupID: string;
    onLoad?: (name: string) => void;
};

const GroupInfo: React.FC<GroupInfoProps> = ({ groupID, onLoad }) => {
    const { data, isLoading, isError, refetch } = useGetGroupByID(groupID);

    useEffect(() => {
        refetch();
    }, [groupID, refetch]);

    useEffect(() => {
        if (data && onLoad) {
            const { name } = data.data.attributes;
            onLoad(name);
        }
    }, [data, onLoad]);

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <Skeleton variant="rounded" width={350} height={74} />
            </View>
        );
    }

    if (isError || !data) {
        return <Text style={styles.errorText}>Error loading group info</Text>;
    }

    const { name, description, userCount, tags } = data.data.attributes;

    return (
        <View style={styles.container}>
            <Text style={styles.groupName}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.userCount}>Members: {userCount}</Text>
            <View style={styles.tagsContainer}>
                {tags.data.map(tag => (
                    <TouchableOpacity key={tag.id}>
                        <View style={styles.tag}>
                            <Text style={styles.tagText}>#{tag.attributes.value}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    groupName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    loadingContainer: {
        padding: 10,
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
    },
    userCount: {
        fontSize: 14,
        color: 'gray',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    tag: {
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 5,
        marginBottom: 5,
    },
    tagText: {
        fontSize: 14,
        color: 'black',
    },
});

export default GroupInfo;
