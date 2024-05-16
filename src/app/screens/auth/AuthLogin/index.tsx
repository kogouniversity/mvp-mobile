import { StyleSheet, View, Dimensions } from 'react-native';
import LoginForm from '../../../components/login/LoginForm';
import { useNavigation } from '../../../navigator/useNavigation';

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
    typo: {
        color: 'white',
    },
});

function AuthLogin(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.ball}>
                <LoginForm onSignIn={() => navigation.navigate('/Home')} />
            </View>
        </View>
    );
}

export default AuthLogin;
