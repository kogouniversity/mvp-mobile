import { View, StyleSheet, Dimensions } from 'react-native';
import IdAndPasswordInputForm from '../../../../components/signup/IdAndPasswordInputForm';
import { useNavigation } from '../../../../navigator/useNavigation';
import { useRoute } from '../../../../navigator/types';
import useSignUp from '../../../../hooks/api/auth/useSignUp';
import { Alert } from 'react-native';

function SignupIdAndPassword(): JSX.Element {
    const navigation = useNavigation();
    const route = useRoute<'/Signup'>();
    const email = route.params.email;
    const { requestSignUpAsync } = useSignUp();

    async function handleSignUp(id: string, password: string) {
        try {
            const unauthenticatedUserData = await requestSignUpAsync({
                username: id,
                password,
                email,
            });
            navigation.navigate('/Login');
        } catch {
            Alert.alert('Failed to proceed, please check your connection.');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.ball}>
                <IdAndPasswordInputForm email={email} onSubmit={handleSignUp} />
            </View>
        </View>
    );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ball: {
        width: height,
        height,
        borderRadius: 99999,
        backgroundColor: '#50B1EE',
    },
});

export default SignupIdAndPassword;
