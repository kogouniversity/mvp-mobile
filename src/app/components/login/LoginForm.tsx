import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, StyleSheet, Dimensions } from 'react-native';
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';
import useSignIn from '../../hooks/api/auth/useSignIn';
import Typography from '../../atoms/Typography';
import { AuthUserDataResponse } from '../../hooks/api/auth/types';
import { useNavigation } from '../../navigator/useNavigation';
import { useAuthStore } from '../../../store/auth';

interface LoginFormInput {
    id: string;
    password: string;
}

export interface LoginFormProps {
    onSignIn: (user: AuthUserDataResponse) => unknown;
}

const LoginForm: React.FC<LoginFormProps> = function ({ onSignIn }) {
    const { register, handleSubmit, setValue, getValues } = useForm<LoginFormInput>();
    const { requestSignInAsync } = useSignIn();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const setJwt = useAuthStore(state => state.setJwt);

    const navigation = useNavigation();

    useEffect(() => {
        register('id', { required: true });
        register('password', { required: true });
    }, [register]);

    async function submitCallback() {
        requestSignInAsync({
            identifier: getValues('id'),
            password: getValues('password'),
        })
            .then(data => {
                setJwt(data.jwt);
                onSignIn(data);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
                setErrorMessage('Failed to login, please check your connection.');
            });
    }

    return (
        <View style={styles.container}>
            <Typography variant="subtitle" style={styles.title}>
                Sign in
            </Typography>
            <TextField
                variant="standard"
                onChangeText={text => setValue('id', text)}
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                style={styles.input}
            />
            <TextField
                variant="standard"
                onChangeText={text => setValue('password', text)}
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                secureTextEntry
                style={styles.input}
            />
            <Button label="Log In" variant="secondary" size="lg" onPress={handleSubmit(submitCallback)} />
            {errorMessage && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errorMessage}
                </Typography>
            )}
            <Typography variant="subtext" style={styles.forgotPw} onPress={() => navigation.navigate('/Signup')}>
                Forgot password?
            </Typography>
            <View style={styles.signup}>
                <Typography variant="subtext" style={styles.typo}>
                    Don&apos;t have a Kogo account yet?&nbsp;
                </Typography>
                <Typography
                    variant="subtext"
                    style={styles.typoUnderlined}
                    onPress={() => navigation.navigate('/Signup')}>
                    Sign Up
                </Typography>
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        color: 'white',
        marginVertical: 15,
    },
    input: {
        marginVertical: 15,
        width: '40%',
        borderColor: 'white',
    },
    signup: {
        display: 'flex',
        flexDirection: 'row',
        marginVertical: 15,
    },
    forgotPw: {
        color: 'white',
        marginVertical: 15,
        textDecorationLine: 'underline',
    },
    typo: {
        color: 'white',
    },
    typoUnderlined: {
        color: 'white',
        textDecorationLine: 'underline',
    },
});

export default LoginForm;
