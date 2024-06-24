import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';

const schema = z
    .object({
        id: z.string().min(3, 'ID must be at least 3 characters long'),
        password: z
            .string()
            .min(8, 'Password must be at least 8 characters long')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Password must include at least one special character'),
        confirmPassword: z.string().min(4, 'Confirm Password must be at least 4 characters long'),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export interface IdAndPasswordInputFormProps {
    email: string;
    onSubmit: (id: string, password: string) => unknown;
}

const IdAndPasswordInputForm: React.FC<IdAndPasswordInputFormProps> = function ({ email, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(schema),
    });

    async function submitCallback() {
        onSubmit(getValues('id'), getValues('password'));
    }

    return (
        <View style={styles.container}>
            <Typography variant="subtitle" style={styles.title}>
                Sign Up
            </Typography>
            <Controller
                name="id"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="standard"
                        placeholder="ID"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.id?.message && (
                <Typography variant="subtext" style={styles.errorText}>
                    {errors.id?.message as string}
                </Typography>
            )}
            <TextField variant="standard" placeholder="Email" value={email} editable={false} style={styles.input} />
            <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="standard"
                        placeholder="Password"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry
                        textContentType="oneTimeCode"
                    />
                )}
            />
            {errors.password?.message && (
                <Typography variant="subtext" style={styles.errorText}>
                    {errors.password?.message as string}
                </Typography>
            )}
            <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="standard"
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry
                        textContentType="oneTimeCode"
                    />
                )}
            />
            {errors.confirmPassword?.message && (
                <Typography variant="subtext" style={styles.errorText}>
                    {errors.confirmPassword?.message as string}
                </Typography>
            )}
            <Button label="Next" variant="secondary" size="lg" onPress={handleSubmit(submitCallback)} />
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
        fontWeight: 'bold',
    },
    input: {
        marginVertical: 15,
        width: '40%',
        borderColor: 'white',
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default IdAndPasswordInputForm;
