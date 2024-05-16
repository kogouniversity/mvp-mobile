import React from 'react';
import { StyleSheet, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import TextField from '../../../atoms/TextField';
import Typography from '../../../atoms/Typography';
import Button from '../../../atoms/Button';

const schema = z
    .object({
        newPassword: z.string().min(8),
        confirm: z.string().min(8),
    })
    .superRefine(({ newPassword, confirm }, ctx) => {
        const uppercaseCheck = /(?=.*[A-Z])/;
        if (!uppercaseCheck.test(newPassword)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'At least one uppercase letter',
                path: ['newPassword'],
            });
        }
        const numberCheck = /(?=.*\d)/;
        if (!numberCheck.test(newPassword)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'At least one number',
                path: ['newPassword'],
            });
        }
        const symbolCheck = /(?=.*[@$!%*?&])/;
        if (!symbolCheck.test(newPassword)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'At least one symbol',
                path: ['newPassword'],
            });
        }
        if (newPassword !== confirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords don't match",
                path: ['confirm'],
            });
        }
    });

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    textField: {
        marginTop: 20,
    },
    textFieldDescrptn: {},
    button: {
        marginVertical: 10,
    },

    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
});

export type ResetPasswordFormProp = {
    onSubmit: (confirm: string) => unknown;
};

const ResetPasswordForm: React.FC<ResetPasswordFormProp> = function ({ onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const submitCB = async () => {
        console.log(errors);
        onSubmit(getValues('confirm'));
    };

    return (
        <View style={styles.container}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Reset your password
            </Typography>
            <Controller
                name="newPassword"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="standard"
                        placeholder="New password"
                        style={styles.textField}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
            {errors.newPassword?.message ? (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errors.newPassword?.message as string}
                </Typography>
            ) : (
                <View>
                    <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                        (min. 8 characters)
                    </Typography>
                    <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                        (At least 1 uppercase letter)
                    </Typography>
                    <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                        (At least 1 number)
                    </Typography>
                    <Typography variant="subtext" color="subtext" style={styles.textFieldDescrptn}>
                        (At least 1 symbol)
                    </Typography>
                </View>
            )}
            <Controller
                name="confirm"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="standard"
                        placeholder="Confirm password"
                        style={styles.textField}
                        onBlur={onBlur}
                        onChangeText={onChange}
                    />
                )}
            />
            {errors.confirm?.message && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errors.confirm?.message as string}
                </Typography>
            )}
            <Button
                label="Reset"
                variant="secondary"
                size="lg"
                onPress={handleSubmit(submitCB)}
                style={styles.button}
            />
        </View>
    );
};

export default ResetPasswordForm;
