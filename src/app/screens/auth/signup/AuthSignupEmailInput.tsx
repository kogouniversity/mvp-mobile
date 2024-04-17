import { Alert, View } from 'react-native';
import { useNavigation } from '../../../utils/navigation';
import EmailInputForm from '../../../components/signup/EmailInputForm';
import useSignUp from '../../../hooks/api/auth/useSignUp';

function AuthSignupEmailInput(): JSX.Element {
    const { requestSignUpAsync } = useSignUp();
    const navigation = useNavigation();
    const { username, password } = { username: 'test', password: 'test' };

    function handleSubmit(email: string) {
        requestSignUpAsync({
            username,
            password,
            email,
        })
            .then(userData => {
                navigation.navigate('AuthSignupEmailVerification', {
                    email,
                });
            })
            .catch(() => Alert.alert('Failed to proceed, please check your connection.'));
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <EmailInputForm onSubmit={email => handleSubmit(email)} />
        </View>
    );
}

export default AuthSignupEmailInput;
