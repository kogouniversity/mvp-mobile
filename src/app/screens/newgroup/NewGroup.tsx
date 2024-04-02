import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Text } from 'react-native';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';
import { useAddPost } from '../../hooks/api/post/useAddPost';
import { useNavigation } from '../../utils/navigation';
import BackButton from '../../components/BackButton';

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
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
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
        alignSelf: 'center',
    },
    selectedGroup: {
        marginBottom: 15,
    },
});

function NewGroup(): JSX.Element {
    const navigation = useNavigation();
    const addPostMutation = useAddPost();

    const onSubmit = async () => {};

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <BackButton navigation={navigation} />
                </TouchableOpacity>
                <Typography variant="subtext" style={styles.headerTitle}>
                    New Group
                </Typography>
                <TouchableOpacity>
                    <Button variant="primary" size="sm" label="Submit" onPress={onSubmit} style={styles.button} />
                </TouchableOpacity>
            </View>

            <TextField variant="outlined" placeholder="name" />
            <TextField variant="outlined" placeholder="short description" />
            <TextField variant="outlined" placeholder="#" />
        </ScrollView>
    );
}

export default NewGroup;
