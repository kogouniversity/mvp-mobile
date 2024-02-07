import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';

const fieldScheme = z.object({
    id: z.string(),
    password: z.string(),
});

interface IdAndPasswordInputFormInput {
    id: string;
    password: string;
}

export interface IdAndPasswordInputFormProps {
    onSubmit: SubmitHandler<IdAndPasswordInputFormInput>;
}

const IdAndPasswordInputForm: React.FC<IdAndPasswordInputFormProps> =
    function ({ onSubmit }) {
        const { register, handleSubmit, setValue } =
            useForm<IdAndPasswordInputFormInput>();

        React.useEffect(() => {
            register('id', { required: true });
            register('password', { required: true });
        }, [register]);

        return (
            <View style={styles.container}>
                <TextField
                    variant="outlined"
                    placeholder="ID"
                    style={styles.input}
                    onChangeText={id => {
                        try {
                            fieldScheme.parse({ id });
                            setValue('id', id);
                        } catch (error) {
                            if (error instanceof z.ZodError) {
                                Alert.alert('Error', error.errors[0].message);
                            }
                        }
                    }}
                />
                <TextField
                    variant="outlined"
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    onChangeText={password => {
                        try {
                            fieldScheme.parse({ password });
                            setValue('password', password);
                        } catch (error) {
                            if (error instanceof z.ZodError) {
                                Alert.alert('Error', error.errors[0].message);
                            }
                        }
                    }}
                />
                <Button
                    variant="primary"
                    size="md"
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        marginBottom: 15,
    },
});

export default IdAndPasswordInputForm;
