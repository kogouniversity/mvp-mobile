import { View } from 'react-native';
import { useNavigation } from '../../../utils/navigation';
import IdAndPasswordInputForm from '../../../components/signup/IdAndPasswordInputForm';

function AuthSignupIdAndPassword(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <IdAndPasswordInputForm
                onSubmit={(id, password) => {
                    navigation.navigate('AuthSignupEmailInput');
                }}
            />
        </View>
    );
}

export default AuthSignupIdAndPassword;
