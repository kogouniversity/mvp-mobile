import { View } from 'react-native';
import { useNavigation } from '../../utils/navigation';
import EmailInputForm from '../../components/signup/EmailInputForm';

function EmailInput(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <EmailInputForm
                onSubmit={data =>
                    navigation.navigate('EmailVerificationCodeInput')
                }
            />
        </View>
    );
}

export default EmailInput;
