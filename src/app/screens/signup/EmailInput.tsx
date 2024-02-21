import { View } from 'react-native';
import { useNavigation } from '../../utils/navigation';
import EmailInputForm from '../../components/signup/EmailInputForm';

function EmailInput(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <EmailInputForm
                onSubmitValidEmail={email =>
                    navigation.navigate('EmailVerificationCodeInput', { email })
                }
            />
        </View>
    );
}

export default EmailInput;
