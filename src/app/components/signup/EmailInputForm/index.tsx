import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import Typography from '../../../atoms/Typography';
import { useSchoolList } from '../../../hooks/api/school/useSchoolList';
import { SchoolListEntryResponse } from '../../../hooks/api/school/useSchoolList/types';

function extractSchoolEmailDomain(schoolListData: SchoolListEntryResponse): string[] {
    const domains = schoolListData.data.map(entryObj => entryObj.attributes.schoolEmailDomain);
    return domains;
}

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
        setError,
    } = useForm({
        resolver: zodResolver(schema),
    });

    const { data, isSuccess } = useSchoolList({
        retry: true,
    });
    const schoolEmailDomains = useMemo(() => (isSuccess ? extractSchoolEmailDomain(data) : []), [data, isSuccess]);

    async function submitCallback() {
        const emailSuffix = getValues('email').match(/.+@(.+)/);
        let match = false;
        if (emailSuffix.length > 1) {
            const suffix = emailSuffix[1];
            schoolEmailDomains.forEach(schoolDomain => {
                if (suffix.includes(schoolDomain)) match = true;
            });
        }
        if (match) {
            onSubmit(getValues('email'));
        } else {
            setError('email', { type: 'custom', message: 'Sorry, this email is not a valid student email.' });
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
                testID="submit-btn"
                disabled={!isSuccess}
                onPress={handleSubmit(submitCallback)}
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

export default EmailInputForm;
