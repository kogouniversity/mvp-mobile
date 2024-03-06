import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import { AuthUserDataResponse } from '../../../hooks/api/auth/types';
import useEmailVerification from '../../../hooks/api/auth/useEmailVerification';
import useRequestNewVerificationEmail from '../../../hooks/api/auth/useRequestNewVerificationEmail';

const schema = z.object({
    verificationCode: z.string().length(6),
});

export interface EmailVerificationFormProps {
    email: string;
    onSubmit: (userData: AuthUserDataResponse) => unknown;
}

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = function ({ email, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { requestEmailVerificationAsync } = useEmailVerification();
    const { requestNewVerificationEmailAsync } = useRequestNewVerificationEmail();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    async function resendVerificationCode() {
        requestNewVerificationEmailAsync({ email })
            .then(() => {
                Alert.alert(`New verification code is sent to ${email}.`);
            })
            .catch(() => {
                setErrorMessage('Failed to request a verification code, please check your connection.');
            });
    }

    async function submitCallback() {
        requestEmailVerificationAsync({ email, verificationCode: getValues('verificationCode') })
            .then(res => onSubmit(res))
            .catch(() => {
                setErrorMessage('This code is expired. Please resend a verification code to your email.');
            });
    }

    return (
        <View style={styles.container}>
            <Typography variant="title">Code Sent!</Typography>
            <Typography variant="subtitle">We sent a verification code to {email}. Enter it below.</Typography>
            <Controller
                name="verificationCode"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="outlined"
                        placeholder="Verification Code"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.verificationCode?.message && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errors.verificationCode?.message as string}
                </Typography>
            )}
            <Button label="Confirm" variant="primary" size="md" onPress={handleSubmit(submitCallback)} />
            {errorMessage && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errorMessage}
                </Typography>
            )}
            <Button label="Resend Code" variant="tertiary" size="sm" onPress={() => resendVerificationCode()} />
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

export default EmailVerificationForm;
