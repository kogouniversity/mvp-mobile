import { View } from 'react-native';
import { useNavigation } from '../../utils/navigation';
import EmailInputForm from '../../components/signup/EmailInputForm';

function EmailInput(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <EmailInputForm
                onEmailEntered={email =>
                    navigation.navigate('EmailVerificationInput', {
                        email,
                    })
                }
            />
        </View>
    );
}

export default EmailInput;
