import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import { isAcademic } from '../../../lib/academicEmailVerifier';
import Typography from '../../../atoms/Typography';

const emailSchema = z.object({
    email: z.string().email(),
});

interface EmailInputFormInput {
    email: string;
}

export interface EmailInputFormProps {
    onSubmit: SubmitHandler<EmailInputFormInput>;
}

const EmailInputForm: React.FC<EmailInputFormProps> = function ({ onSubmit }) {
    const { register, handleSubmit, setValue } = useForm<EmailInputFormInput>();

    React.useEffect(() => {
        register('email', { required: true });
    }, [register]);

    return (
        <View style={styles.container}>
            <TextField
                variant="outlined"
                placeholder="Email"
                style={styles.input}
                onChangeText={email => {
                    try {
                        emailSchema.parse({ email });
                        if (isAcademic(email)) {
                            setValue('email', email);
                        } else {
                            Alert.alert(
                                'Error',
                                'Please enter a valid academic email address.',
                            );
                        }
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
                onPress={handleSubmit(onSubmit)}>
                <Typography variant="subtitle">Next</Typography>
            </Button>
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

export default EmailInputForm;
