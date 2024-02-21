import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import TextField from '../../../atoms/TextField';
import Button from '../../../atoms/Button';
import { isAcademic } from '../../../lib/academicEmailVerifier';
import Typography from '../../../atoms/Typography';
import { useSchools } from '../../../hooks/api/useSchools';
import { ListSchoolResponse } from '../../../hooks/api/useSchools/types';

function extractSchoolEmailDomain(
    schoolDataList: ListSchoolResponse,
): string[] {
    return [];
}

const emailSchema = z.object({
    email: z.string().email(),
});

interface EmailInputFormInput {
    email: string;
}

export interface EmailInputFormProps {
    onSubmitValidEmail: (email: string) => unknown;
}

/**
 * Email Input Form communicates with school list API to check if the given email is valid.
 * The valid email is an email with a university domain mailing address.
 */
const EmailInputForm: React.FC<EmailInputFormProps> = function ({
    onSubmitValidEmail,
}) {
    const { register, handleSubmit, setValue, getValues } =
        useForm<EmailInputFormInput>();
    const { data, isSuccess } = useSchools();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const schoolEmailDomains = useMemo(
        () => (isSuccess ? extractSchoolEmailDomain(data) : []),
        [data, isSuccess],
    );

    React.useEffect(() => {
        register('email', { required: true });
    }, [register]);

    async function submitCallback() {
        if (isSuccess) {
            if (schoolEmailDomains.includes(getValues('email'))) {
                onSubmitValidEmail(getValues('email'));
            } else {
                setErrorMessage('Sorry, this email is not valid.');
            }
        } else {
            setErrorMessage('Failed to proceed, please check your connection.');
        }
    }

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
                    } catch (e) {
                        if (e instanceof z.ZodError) {
                            Alert.alert('Error', e.errors[0].message);
                        }
                    }
                }}
            />
            <Button
                variant="primary"
                size="md"
                onPress={handleSubmit(submitCallback)}>
                <Typography variant="subtitle">Next</Typography>
            </Button>
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
