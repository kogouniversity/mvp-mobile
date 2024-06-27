import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Typography from '../../../atoms/Typography';
import Button from '../../../atoms/Button';
import BackButton from '../../../components/BackButton';
import GroupImage from '../../../components/group/GroupImage';
import TagInput from '../../../components/TagInput';
import { useNavigation } from '../../../navigator/useNavigation';
import { useAddGroup } from '../../../hooks/api/group/useCreateGroup';

const schema = z.object({
    groupName: z.string().max(15),
    description: z.string().max(50),
    // tags: z.string().array().max(5),
});

type CreateGroupForm = z.infer<typeof schema>;

const CreateNewGroup = function (): JSX.Element {
    const [setTags] = useState<string[]>([]);
    const navigation = useNavigation();
    const addGroupMutation = useAddGroup();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateGroupForm>({
        resolver: zodResolver(schema),
    });

    const submitCB: SubmitHandler<CreateGroupForm> = async data => {
        console.log('Submit handler called with data:', data);
        try {
            await addGroupMutation.mutateAsync({
                name: data.groupName,
                description: data.description,
            });
            Alert.alert('Success', 'Group created successfully', [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack(),
                },
            ]);
        } catch (error) {
            Alert.alert('Error', 'Failed to create group');
        }
    };

    const onError = (errors: any) => {
        console.log('Errors:', errors);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <BackButton navigation={navigation} />
                    </TouchableOpacity>
                    <Typography variant="subtext" style={styles.headerTitle}>
                        New Group
                    </Typography>
                    <Button variant="primary" size="sm" label="done" onPress={handleSubmit(submitCB, onError)} />
                </View>
                <View style={styles.content}>
                    <GroupImage />
                    <Controller
                        name="groupName"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                variant="standard"
                                placeholder="name"
                                style={styles.textField}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
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
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TextField
                                variant="standard"
                                placeholder="short description"
                                style={styles.textField}
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                            />
                        )}
                    />
                    <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                        (max. 50 characters)
                    </Typography>
                    {errors.description?.message && (
                        <Typography variant="subtext" style={{ color: 'red' }}>
                            {errors.description?.message as string}
                        </Typography>
                    )}
                    {/* <Controller
                        name="tags"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <TagInput
                                setTagValues={setTags}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                style={styles.textField}
                            />
                        )}
                    /> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
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
    backButton: {
        marginLeft: -15,
        alignSelf: 'center',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        width: '90%',
        marginTop: 20,
        color: 'black',
    },
    textFieldDescrptn: {
        width: '90%',
        padding: 0,
        marginVertical: 0,
    },
});

export default CreateNewGroup;
