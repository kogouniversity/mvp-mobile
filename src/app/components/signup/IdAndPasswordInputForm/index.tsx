import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import useSignUp from '../../../hooks/api/auth/useSignUp';
import Typography from '../../../atoms/Typography';
import { AuthUserDataResponse } from '../../../hooks/api/auth/types';

const fieldScheme = z.object({
    id: z.string(),
    password: z.string(),
});

interface IdAndPasswordInputFormInput {
    id: string;
    password: string;
}

export interface IdAndPasswordInputFormProps {
    email: string;
    emailToken: string;
    onSubmit: (userData: AuthUserDataResponse) => unknown;
}

const IdAndPasswordInputForm: React.FC<IdAndPasswordInputFormProps> = function ({ email, emailToken, onSubmit }) {
    const { register, handleSubmit, setValue, getValues } = useForm<IdAndPasswordInputFormInput>();
    const { requestSignUpAsync } = useSignUp();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    React.useEffect(() => {
        register('id', { required: true });
        register('password', { required: true });
    }, [register]);

    async function submitCallback() {
        requestSignUpAsync({
            username: getValues('id'),
            password: getValues('password'),
            email,
            emailToken,
        })
            .then(data => onSubmit(data))
            .catch(() => {
                setErrorMessage('Failed to sign up, please check your connection.');
            });
    }

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
            <Button label="Sign Up" variant="primary" size="md" onPress={handleSubmit(submitCallback)} />
            {errorMessage && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errorMessage}
                </Typography>
            )}
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
