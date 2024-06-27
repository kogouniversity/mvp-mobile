import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Text, SafeAreaView } from 'react-native';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import { useAddPost } from '../../../hooks/api/post/useAddPost';
import MyGroupListIcon from '../../../components/group/MyGroupListIcon';
import BackButton from '../../../components/BackButton';
import { useNavigation } from '../../../navigator/useNavigation';

function CreateNewPost(): JSX.Element {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [selectedGroupName, setSelectedGroupName] = useState('');
    const navigation = useNavigation();
    const addPostMutation = useAddPost();

    const onSubmit = async () => {
        try {
            await addPostMutation.mutateAsync({
                title,
                content,
                groupId: selectedGroup,
            });
            Alert.alert('Success', 'Post added successfully', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            Alert.alert('Error', `Failed to add post`);
        }
    };

    const handleGroupSelect = (groupId: string, groupName: string) => {
        setSelectedGroup(groupId);
        setSelectedGroupName(groupName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <BackButton navigation={navigation} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.doneButton}>
                        <Button variant="primary" size="sm" label="Done" onPress={onSubmit} />
                    </TouchableOpacity>
                </View>
                <View>
                    {selectedGroup ? (
                        <Text style={styles.selectedGroup}>Selected group: {selectedGroupName}</Text>
                    ) : (
                        <Text style={styles.selectGroup}>Select a group</Text>
                    )}
                </View>
                <MyGroupListIcon
                    onGroupSelect={handleGroupSelect}
                    selectedGroup={selectedGroup}
                    selectedGroupName={selectedGroupName}
                />
                <TextField
                    variant="standard"
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    titleInput: {
        marginVertical: 10,
        width: '100%',
        color: 'black',
    },
    descriptionInput: {
        marginVertical: 10,
        width: '100%',
        height: 100,
        textAlignVertical: 'top',
    },
    backButton: {
        alignSelf: 'center',
    },
    doneButton: {
        marginLeft: 'auto',
    },
    selectedGroup: {
        marginBottom: 14,
        fontWeight: 'bold',
    },
    selectGroup: {
        marginBottom: 14,
        fontWeight: 'bold',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default CreateNewPost;
