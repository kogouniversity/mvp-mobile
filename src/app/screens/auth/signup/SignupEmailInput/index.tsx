import { Alert, View } from 'react-native';
import EmailInputForm from '../../../../components/signup/EmailInputForm';
import useSignUp from '../../../../hooks/api/auth/useSignUp';
import { useNavigation } from '../../../../navigator/useNavigation';
import { useRoute } from '../../../../navigator/useRoute';

function SignupEmailInput(): JSX.Element {
    const { requestSignUpAsync } = useSignUp();
    const navigation = useNavigation();
    const route = useRoute<'SignupEmailInput'>();
    const { username, password } = route.params;

    function handleSubmit(email: string) {
        requestSignUpAsync({
            username,
            password,
            email,
        })
            .then(unauthenticatedUserData => {
                navigation.navigate('/Signup/EmailVerification', {
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

export default SignupEmailInput;
