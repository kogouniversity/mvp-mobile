import { Alert, View } from 'react-native';
import EmailVerificationForm from '../../../../components/signup/EmailVerificationForm';
import Typography from '../../../../atoms/Typography';
import useEmailVerification from '../../../../hooks/api/auth/useEmailVerification';
import useRequestNewVerificationEmail from '../../../../hooks/api/auth/useRequestNewVerificationEmail';
import { useNavigation } from '../../../../navigator/useNavigation';
import { useRoute } from '../../../../navigator/useRoute';

function SignupEmailVerification(): JSX.Element {
    const navigation = useNavigation();
    const { requestEmailVerificationAsync } = useEmailVerification();
    const { requestNewVerificationEmailAsync } = useRequestNewVerificationEmail();
    const route = useRoute<'SignupEmailVerification'>();
    const { email } = route.params;

    function resendVerificationCode() {
        requestNewVerificationEmailAsync({ email })
            .then(() => {
                Alert.alert(`A new code is sent to ${email}.`);
            })
            .catch(() => {
                Alert.alert('Failed to request a verification code, please check your connection.');
            });
    }

    async function verifyCode(emailVerificationCode: string) {
        requestEmailVerificationAsync({ code: emailVerificationCode })
            .then(userData => {
                navigation.navigate('/Home');
            })
            .catch(() => {
                Alert.alert("This code is correct, either it's wrong or expired.");
            });
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Typography variant="title">Code Sent!</Typography>
            <Typography variant="subtitle">We sent a verification code to {email}. Enter it below.</Typography>
            <EmailVerificationForm onResendCode={() => resendVerificationCode()} onSubmit={code => verifyCode(code)} />
        </View>
    );
}

export default SignupEmailVerification;
