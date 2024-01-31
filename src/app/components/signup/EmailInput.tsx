import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Button from '../../atoms/Button';
import TextField from '../../atoms/inputs/TextField'; 
import { z } from 'zod';
import { isAcademic, getInstitutionName } from '../academicVerifier/AcademicEmailVerifier';

const emailSchema = z.object({
    email: z.string().email(),
});

interface EmailInputProps {
    navigate: (screenName: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ navigate }) => {
    const [email, setEmail] = useState('');

    const handleNext = () => {
        try {
            emailSchema.parse({ email });
            if (isAcademic(email)) {
                const institutionName = getInstitutionName(email);
                console.log(`Institution Name: ${institutionName}`);
                navigate('VerificationCode');
            } else {
                Alert.alert('Error', 'Please enter a valid academic email address.');
                return;
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                Alert.alert('Error', error.errors[0].message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TextField 
                variant="outlined" 
                placeholder="Email" 
                style={styles.input}
                value={email}
                onChangeText={setEmail} />
            <Button text="Next" variant="primary" size="md" onPress={handleNext} />
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

export default EmailInput;
