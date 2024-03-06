import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import { useSchoolList } from '../../../hooks/api/school/useSchoolList';
import { SchoolListEntryResponse } from '../../../hooks/api/school/useSchoolList/types';
import useSignUp from '../../../hooks/api/auth/useSignUp';

function extractSchoolEmailDomain(schoolListData: SchoolListEntryResponse): string[] {
    const domains = schoolListData.data.map(entryObj => entryObj.attributes.email_domain);
    return domains;
}

const schema = z.object({
    email: z.string().email(),
});

export interface EmailInputFormProps {
    username: string;
    password: string;
    onSubmit: (email: string) => unknown;
}

/**
 * Email Input Form communicates with school list API to check if the given email is valid.
 * The valid email is an email with a university domain mailing address.
 */
const EmailInputForm: React.FC<EmailInputFormProps> = function ({ username, password, onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { data, isSuccess, isLoading } = useSchoolList({
        retry: true,
    });
    const { requestSignUpAsync } = useSignUp();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const schoolEmailDomains = useMemo(() => (isSuccess ? extractSchoolEmailDomain(data) : []), [data, isSuccess]);

    async function submitCallback() {
        if (isSuccess) {
            if (schoolEmailDomains.includes(getValues('email'))) {
                requestSignUpAsync({
                    username,
                    password,
                    email: getValues('email'),
                })
                    .then(() => onSubmit(getValues('email')))
                    .catch(() => setErrorMessage('Failed to proceed, please check your connection.'));
            } else {
                setErrorMessage('Sorry, this email is not a valid student email.');
            }
        } else {
            setErrorMessage('Failed to proceed, please check your connection.');
        }
    }

    return (
        <View style={styles.container}>
            <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextField
                        variant="outlined"
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
                variant="primary"
                size="md"
                disabled={isLoading}
                onPress={handleSubmit(submitCallback)}
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

export default EmailInputForm;
