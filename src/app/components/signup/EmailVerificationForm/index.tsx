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

const CODE_LENGTH = 6;
const RESEND_REQUEST_DELAY_SECONDS = 30;

const schema = z.object({
    verificationCode: z.string().length(CODE_LENGTH),
});

export interface EmailVerificationFormProps {
    email: string;
    onSubmit: (verifiedUserData: AuthUserDataResponse) => unknown;
}

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = function ({ email, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
        resetField,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { requestEmailVerificationAsync } = useEmailVerification();
    const { requestNewVerificationEmailAsync } = useRequestNewVerificationEmail();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [resendReqTimestamp, setResendReqTimestamp] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    function resendVerificationCode() {
        setLoading(true);
        if (
            !resendReqTimestamp ||
            (new Date().getTime() - resendReqTimestamp.getTime()) / 1000 >= RESEND_REQUEST_DELAY_SECONDS
        ) {
            requestNewVerificationEmailAsync({ email })
                .then(() => {
                    Alert.alert(`A new code is sent to ${email}.`);
                    resetField('verificationCode');
                    setLoading(false);
                })
                .catch(() => {
                    setErrorMessage('Failed to request a verification code, please check your connection.');
                    setLoading(false);
                });
            setResendReqTimestamp(new Date());
        }
    }

    async function submitCallback() {
        if (!errors.verificationCode) {
            requestEmailVerificationAsync({ email, verificationCode: getValues('verificationCode') })
                .then(res => onSubmit(res))
                .catch(() => {
                    setErrorMessage("This code is correct, either it's wrong or expired.");
                });
        }
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
            <Button
                label="Confirm"
                disabled={!getValues('verificationCode') || getValues('verificationCode').length !== CODE_LENGTH}
                variant="primary"
                size="md"
                onPress={handleSubmit(submitCallback)}
                testID="submit-btn"
            />
            <Button
                label="Resend Code"
                variant="tertiary"
                isLoading={isLoading}
                size="sm"
                onPress={() => resendVerificationCode()}
                testID="resend-btn"
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

export default EmailVerificationForm;
