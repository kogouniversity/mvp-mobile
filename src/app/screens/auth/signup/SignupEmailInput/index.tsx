import { View, StyleSheet, Dimensions } from 'react-native';
import EmailInputForm from '../../../../components/signup/EmailInputForm';
import { useNavigation } from '../../../../navigator/useNavigation';

function SignupEmailInput(): JSX.Element {
    const navigation = useNavigation();

    function handleSubmit(email: string) {
        navigation.navigate('/Signup', { email });
    }

    return (
        <View style={styles.container}>
            <View style={styles.ball}>
                <EmailInputForm onSubmit={email => handleSubmit(email)} />
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

export default SignupEmailInput;
