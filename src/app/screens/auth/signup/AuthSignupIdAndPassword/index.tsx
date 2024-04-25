import { View } from 'react-native';
import IdAndPasswordInputForm from '../../../../components/signup/IdAndPasswordInputForm';
import { useNavigation } from '../../../../navigator/useNavigation';

function AuthSignupIdAndPassword(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <IdAndPasswordInputForm
                onSubmit={(id, password) => {
                    navigation.navigate('/Signup/EmailInput', { username: id, password });
                }}
            />
        </View>
    );
}

export default AuthSignupIdAndPassword;
