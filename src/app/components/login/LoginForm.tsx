import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';
import useSignIn from '../../hooks/api/auth/useSignIn';
import Typography from '../../atoms/Typography';
import { AuthUserDataResponse } from '../../hooks/api/auth/types';

interface LoginFormInput {
    id: string;
    password: string;
}

export interface LoginFormProps {
    onSignIn: (user: AuthUserDataResponse) => unknown;
}

const LoginForm: React.FC<LoginFormProps> = function ({ onSignIn }) {
    const { register, handleSubmit, setValue, getValues } =
        useForm<LoginFormInput>();
    const { requestSignInAsync } = useSignIn();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    React.useEffect(() => {
        register('id', { required: true });
        register('password', { required: true });
    }, [register]);

    async function submitCallback() {
        requestSignInAsync({
            identifier: getValues('id'),
            password: getValues('password'),
        })
            .then(data => onSignIn(data))
            .catch(() => {
                setErrorMessage(
                    'Failed to login, please check your connection.',
                );
            });
    }

    return (
        <View style={styles.container}>
            <TextField
                variant="outlined"
                onChangeText={text => setValue('id', text)}
                placeholder="ID"
                style={styles.input}
            />
            <TextField
                variant="outlined"
                onChangeText={text => setValue('password', text)}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
            />
            <Button
                variant="primary"
                size="md"
                onPress={handleSubmit(submitCallback)}
            />
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

export default LoginForm;
