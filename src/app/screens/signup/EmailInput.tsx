import { View } from 'react-native';
import { useNavigation, useRoute } from '../../utils/navigation';
import EmailInputForm from '../../components/signup/EmailInputForm';

function EmailInput(): JSX.Element {
    const navigation = useNavigation();
    const route = useRoute<'EmailInput'>();
    const { username, password } = route.params;
    return (
        <View style={{ alignItems: 'center' }}>
            <EmailInputForm
                username={username}
                password={password}
                onSubmit={email =>
                    navigation.navigate('EmailVerificationInput', {
                        email,
                    })
                }
            />
        </View>
    );
}

export default EmailInput;
