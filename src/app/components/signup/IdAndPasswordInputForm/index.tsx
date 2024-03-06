import React from 'react';
import { View, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';

const schema = z.object({
    id: z.string().min(3),
    password: z.string().min(4),
});

export interface IdAndPasswordInputFormProps {
    onSubmit: (id: string, password: string) => unknown;
}

const IdAndPasswordInputForm: React.FC<IdAndPasswordInputFormProps> = function ({ onSubmit }) {
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
            <Controller
                name="id"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="outlined"
                        placeholder="ID"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.id?.message && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errors.id?.message as string}
                </Typography>
            )}
            <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="outlined"
                        placeholder="Password"
                        style={styles.input}
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.password?.message && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errors.password?.message as string}
                </Typography>
            )}
            <Button label="Next" variant="primary" size="md" onPress={handleSubmit(submitCallback)} />
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

export default IdAndPasswordInputForm;
