import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';

const fieldScheme = z.object({
    code: z.number(),
});

interface EmailVerificationCodeFormInput {
    code: string;
}

export interface EmailVerificationCodeFormProps {
    onSubmit: SubmitHandler<EmailVerificationCodeFormInput>;
}

const EmailVerificationCodeForm: React.FC<EmailVerificationCodeFormProps> =
    function ({ onSubmit }) {
        const { register, handleSubmit, setValue } =
            useForm<EmailVerificationCodeFormInput>();

        React.useEffect(() => {
            register('code', { required: true });
        }, [register]);

        return (
            <View style={styles.container}>
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

export default EmailVerificationCodeForm;
