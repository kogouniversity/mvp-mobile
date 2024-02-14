import { View } from 'react-native';
import { useNavigation } from '../../utils/navigation';
import EmailVerificationCodeForm from '../../components/signup/EmailVerificationCodeForm';

function EmailVerificationCodeInput(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <EmailVerificationCodeForm
                onSubmit={data => navigation.navigate('IdAndPasswordInput')}
            />
        </View>
    );
}

export default EmailVerificationCodeInput;
