import { View } from 'react-native';
import { useNavigation, useRoute } from '../../utils/navigation';
import IdAndPasswordInputForm from '../../components/signup/IdAndPasswordInputForm';

function IdAndPasswordInput(): JSX.Element {
    const navigation = useNavigation();
    const route = useRoute<'IdAndPasswordInput'>();
    const { email, emailToken } = route.params;
    return (
        <View style={{ alignItems: 'center' }}>
            <IdAndPasswordInputForm
                email={email}
                emailToken={emailToken}
                onSubmit={() => navigation.navigate('Home')}
            />
        </View>
    );
}

export default IdAndPasswordInput;
