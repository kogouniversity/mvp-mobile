import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import useRequestEmailToken from '../../../hooks/api/auth/useRequestEmailToken';
import useRequestEmailVerificationCode from '../../../hooks/api/auth/useRequestEmailVerificationCode';
import Typography from '../../../atoms/Typography';

const fieldScheme = z.object({
    emailVerificationCode: z.number(),
});

interface EmailVerificationFormInput {
    code: string;
}

export interface EmailVerificationFormProps {
    email: string;
    onEmailVerified: (verifiedEmailToken: string) => unknown;
}

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = function ({ email, onEmailVerified }) {
    const { register, handleSubmit, setValue, getValues } = useForm<EmailVerificationFormInput>();
    const { requestEmailVerificationCodeAsync } = useRequestEmailVerificationCode();
    const { requestEmailTokenAsync } = useRequestEmailToken();
    const [verificationCodeAnswer, setVerificationCodeAnswer] = useState<string | null>(null);
    const [verificationCodeExpiry, setVerificationCodeExpiry] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resendVerificationCode = useCallback(async () => {
        requestEmailVerificationCodeAsync({
            email,
        })
            .then(({ verificationCode, expiry }) => {
                setVerificationCodeAnswer(verificationCode);
                setVerificationCodeExpiry(new Date(expiry));
            })
            .catch(() =>
                setErrorMessage(`Failed to send a verification code to ${email}, please check your connection.`),
            );
    }, [requestEmailVerificationCodeAsync, email]);

    React.useEffect(() => {
        register('code', { required: true });
        resendVerificationCode();
    }, [register, resendVerificationCode]);

    async function submitCallback() {
        if (verificationCodeExpiry && new Date() > verificationCodeExpiry) {
            setErrorMessage('The code is expired. Please resend a verification code to your email.');
            return;
        }

        if (getValues('code') !== verificationCodeAnswer) {
            setErrorMessage('The code you entered is not correct.');
            return;
        }

        requestEmailTokenAsync({ verificationCode: getValues('code') })
            .then(({ emailToken }) => onEmailVerified(emailToken))
            .catch(() => {
                setErrorMessage('Failed to proceed, please check your connection.');
            });
    }

    return (
        <View style={styles.container}>
            <Typography variant="title">Code Sent!</Typography>
            <Typography variant="subtitle">We sent a verification code to {email}. Enter it below.</Typography>
            <TextField
                variant="outlined"
                placeholder="Verification Code"
                style={styles.input}
                onChangeText={code => {
                    try {
                        fieldScheme.parse({ code });
                        setValue('code', code);
                    } catch (error) {
                        if (error instanceof z.ZodError) {
                            Alert.alert('Error', error.errors[0].message);
                        }
                    }
                }}
            />
            <Button label="Confirm" variant="primary" size="md" onPress={handleSubmit(submitCallback)} />
            <Button label="Resend Code" variant="tertiary" size="sm" onPress={() => resendVerificationCode()} />
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

export default EmailVerificationForm;
