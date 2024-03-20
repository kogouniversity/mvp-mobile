import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Text } from 'react-native';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import { useAddPost } from '../../hooks/api/post/useAddPost';
import { AntDesign } from '@expo/vector-icons';
import MyGroupListIcon from '../../components/group/MyGroupListIcon';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    headerTitle: {
        position: 'absolute',
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    titleInput: {
        marginVertical: 10,
        width: '100%',
    },
    descriptionInput: {
        marginVertical: 10,
        width: '100%',
        height: 100,
        textAlignVertical: 'top',
    },
    button: {
        width: '100%',
    },
    backButton: {
        marginLeft: -15,
    },
    selectedGroup: {
        marginBottom: 15,
    },
});

function NewPost(): JSX.Element {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    const addPostMutation = useAddPost();

    const onSubmit = async () => {
        try {
            await addPostMutation.mutateAsync({
                title,
                content,
                groupName: selectedGroup,
            });
            Alert.alert('Success', 'Post added successfully');
        } catch (error) {
            Alert.alert('Error', 'Failed to add post');
            console.error(error);
        }
    };
    const handleGroupSelect = (groupName: string) => {
        setSelectedGroup(groupName);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => {}}>
                    <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
                <Typography variant="subtext" style={styles.headerTitle}>
                    New Post
                </Typography>
                <TouchableOpacity>
                    <Button variant="primary" size="sm" label="Submit" onPress={onSubmit} style={styles.button} />
                </TouchableOpacity>
            </View>
            <View>{selectedGroup && <Text style={styles.selectedGroup}>Selected group: {selectedGroup}</Text>}</View>
            <MyGroupListIcon userId="3" onGroupSelect={handleGroupSelect} selectedGroup={selectedGroup} />
            <TextField
                variant="outlined"
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                style={styles.titleInput}
            />
            <TextField
                variant="outlined"
                placeholder="What do you want to share today?"
                multiline
                numberOfLines={4}
                value={content}
                onChangeText={setContent}
                style={styles.descriptionInput}
            />
        </ScrollView>
    );
}

export default NewPost;
