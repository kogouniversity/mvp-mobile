import { View } from 'react-native';
import { useNavigation } from '../../utils/navigation';
import IdAndPasswordInputForm from '../../components/signup/IdAndPasswordInputForm';

function IdAndPasswordInput(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <IdAndPasswordInputForm
                onSubmit={(id, password) => navigation.navigate('Home', { username: id, password })}
            />
        </View>
    );
}

export default IdAndPasswordInput;
