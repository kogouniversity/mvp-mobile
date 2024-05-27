import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Typography from '../../../atoms/Typography';
import Button from '../../../atoms/Button';
import BackButton from '../../../components/BackButton';
import GroupImage from '../../../components/group/GroupImage';
import TagInput from '../../../components/TagInput';
import { useNavigation } from '../../../navigator/useNavigation';

const schema = z.object({
    groupName: z.string().max(15),
    description: z.string().max(50),
    tags: z.string().array().max(5),
});

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
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        width: '90%',
        marginTop: 20,
    },
    textFieldDescrptn: {
        width: '90%',
        padding: 0,
        marginVertical: 0,
    },
});

const CreateNewGroup = function (): JSX.Element {
    const [, setTags] = useState<string[]>([]);

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const submitCB = async () => {
        // console.log(getValues('groupName'), getValues('description'), tags);
    };

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
                    <Button
                        variant="primary"
                        size="sm"
                        label="Submit"
                        onPress={handleSubmit(submitCB)}
                        style={styles.button}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>
                <GroupImage />
                <Controller
                    name="groupName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            variant="standard"
                            placeholder="name"
                            style={styles.textField}
                            onChangeText={onChange}
                            onBlur={onBlur}
                        />
                    )}
                />
                <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                    (max. 15 characters)
                </Typography>
                {errors.groupName?.message && (
                    <Typography variant="subtext" style={{ color: 'red' }}>
                        {errors.groupName?.message as string}
                    </Typography>
                )}
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextField
                            variant="standard"
                            placeholder="short description"
                            style={styles.textField}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    )}
                />
                <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                    (max. 50 characters)
                </Typography>
                {errors.descrptn?.message && (
                    <Typography variant="subtext" style={{ color: 'red' }}>
                        {errors.descrptn?.message as string}
                    </Typography>
                )}
                <Controller
                    name="tags"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TagInput
                            setTagValues={setTags}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            style={styles.textField}
                        />
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default CreateNewGroup;
