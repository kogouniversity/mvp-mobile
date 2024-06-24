import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';

const schema = z.object({
    email: z.string().email('Invalid email'),
});

export interface EmailInputFormProps {
    onSubmit: (email: string) => unknown;
}

/**
 * Email Input Form communicates with school list API to check if the given email is valid.
 * The valid email is an email with a university domain mailing address.
 */
const EmailInputForm: React.FC<EmailInputFormProps> = function ({ onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(schema),
    });

    async function submitCallback() {
        onSubmit(getValues('email'));
    }

    return (
        <View style={styles.container}>
            <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="standard"
                        placeholder="Email"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.email?.message && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errors.email?.message as string}
                </Typography>
            )}
            <Button
                label="Next"
                variant="secondary"
                size="lg"
                testID="submit-btn"
                disabled={getValues('email') && getValues('email').length > 0}
                onPress={handleSubmit(submitCallback)}
            />
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
});

export default EmailInputForm;
