import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { View, StyleSheet } from 'react-native';
import Button from '../../atoms/Button';
import TextField from '../../atoms/TextField';

interface LoginFormInput {
    id: string;
    password: string;
}

export interface LoginFormProps {
    onSubmit: SubmitHandler<LoginFormInput>;
}

const LoginForm: React.FC<LoginFormProps> = function ({ onSubmit }) {
    const { register, handleSubmit, setValue } = useForm<LoginFormInput>();

    React.useEffect(() => {
        register('id', { required: true });
        register('password', { required: true });
    }, [register]);

    return (
        <View style={styles.container}>
            <TextField
                variant="outlined"
                onChangeText={text => setValue('id', text)}
                placeholder="ID"
                style={styles.input}
            />
            <TextField
                variant="outlined"
                onChangeText={text => setValue('password', text)}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
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

export default LoginForm;
