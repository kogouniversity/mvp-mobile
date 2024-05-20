import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useFriends } from '../../hooks/api/friends/useGetFriends';
import { List, ListItem, ListItemButton, ListItemText } from '../../atoms/List';
import Skeleton from '../../atoms/Skeleton';

interface FriendsListProps {
    userId: string;
}

const FriendsList: React.FC<FriendsListProps> = ({ userId }) => {
    const { data, isLoading } = useFriends(userId);
    const screenWidth = Dimensions.get('window').width;

    if (isLoading) {
        return (
            <View style={styles.container}>
                <List variant="vertical">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <ListItem key={index} style={StyleSheet.flatten([styles.listItem, { width: screenWidth }])}>
                            <Skeleton
                                variant="rectangular"
                                width={screenWidth}
                                height={70}
                                style={{ marginBottom: 0 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </View>
        );
    }

    const handlePress = (name: string) => {
        alert(name);
    };

    return (
        <View style={styles.container}>
            <List variant="vertical">
                {data?.data.map(friend => (
                    <ListItem key={friend.id} style={StyleSheet.flatten([styles.listItem, { width: screenWidth }])}>
                        <ListItemButton style={styles.listItemButton} onPress={() => handlePress(friend.name)}>
                            <ListItemText style={styles.listItemText} primary={friend.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    listItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        overflow: 'hidden',
        height: 80,
    },
    listItemButton: {
        paddingVertical: 0,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    listItemText: {
        flex: 1,
        textAlign: 'left',
        fontSize: 18,
        justifyContent: 'center',
    },
});

export default FriendsList;
