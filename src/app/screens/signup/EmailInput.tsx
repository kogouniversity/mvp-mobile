import { useState } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '../../utils/navigation';
import EmailInputForm from '../../components/signup/EmailInputForm';
import useSignUp from '../../hooks/api/auth/useSignUp';
import Typography from '../../atoms/Typography';

function EmailInput(): JSX.Element {
    const { requestSignUpAsync } = useSignUp();
    const navigation = useNavigation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const route = useRoute<'EmailInput'>();
    const { username, password } = route.params;

    function handleSubmit(email: string) {
        requestSignUpAsync({
            username,
            password,
            email,
        })
            .then(userData => {
                navigation.navigate('EmailVerificationInput', {
                    email,
                });
            })
            .catch(() => setErrorMessage('Failed to proceed, please check your connection.'));
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <EmailInputForm onSubmit={email => handleSubmit(email)} />
            {errorMessage && (
                <Typography variant="subtext" style={{ color: 'red' }}>
                    {errorMessage}
                </Typography>
            )}
        </View>
    );
}

export default EmailInput;
