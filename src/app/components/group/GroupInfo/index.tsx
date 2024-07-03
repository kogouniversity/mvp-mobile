import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Skeleton from '../../../atoms/Skeleton';
import { useGetGroupByID } from '../../../hooks/api/group/useGetGroupByID';

export type GroupInfoProps = {
    groupID: string;
    onLoad?: (name: string) => void;
};

const GroupInfo: React.FC<GroupInfoProps> = ({ groupID, onLoad }) => {
    const { data, isLoading, isError } = useGetGroupByID(groupID);

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
        return <Text style={styles.errorText}></Text>;
    }

    const { name, description, userCount } = data.data.attributes;

    return (
        <View style={styles.container}>
            <Text style={styles.groupName}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
            <Text style={styles.userCount}>Members: {userCount}</Text>
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
});

export default GroupInfo;
