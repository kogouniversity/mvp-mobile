import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';

const CODE_LENGTH = 6;
const RESEND_REQUEST_DELAY_SECONDS = 30;

const schema = z.object({
    emailVerificationCode: z.string().length(CODE_LENGTH),
});

export interface EmailVerificationFormProps {
    onResendCode: () => unknown;
    onSubmit: (emailVerificationCode: string) => unknown;
}

const EmailVerificationForm: React.FC<EmailVerificationFormProps> = function ({ onResendCode, onSubmit }) {
    const { control, handleSubmit, getValues, resetField } = useForm({
        resolver: zodResolver(schema),
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [resendReqTimestamp, setResendReqTimestamp] = useState<Date | null>(null);

    async function submitCallback() {
        onSubmit(getValues('emailVerificationCode'));
    }

    async function resendCode() {
        setLoading(true);
        if (
            !resendReqTimestamp ||
            (new Date().getTime() - resendReqTimestamp.getTime()) / 1000 >= RESEND_REQUEST_DELAY_SECONDS
        ) {
            Alert.alert("You've recently requested a new code. Please try again shortly.");
            setLoading(false);
            return;
        }
        setResendReqTimestamp(new Date());
        resetField('emailVerificationCode');
        onResendCode();
    }

    return (
        <View style={styles.container}>
            <Controller
                name="emailVerificationCode"
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
                onPress={() => resendCode()}
                testID="resend-btn"
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

export default EmailVerificationForm;
