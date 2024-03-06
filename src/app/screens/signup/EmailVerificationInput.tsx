import { View } from 'react-native';
import { useNavigation, useRoute } from '../../utils/navigation';
import EmailVerificationForm from '../../components/signup/EmailVerificationForm';

function EmailVerificationInput(): JSX.Element {
    const navigation = useNavigation();
    const route = useRoute<'EmailVerificationInput'>();
    const { email } = route.params;
    return (
        <View style={{ alignItems: 'center' }}>
            <EmailVerificationForm email={email} onSubmit={() => navigation.navigate('Home')} />
        </View>
    );
}

export default EmailVerificationInput;
