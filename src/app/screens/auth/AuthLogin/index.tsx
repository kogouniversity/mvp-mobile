import { StyleSheet, View } from 'react-native';
import LoginForm from '../../../components/login/LoginForm';
import Typography from '../../../atoms/Typography';
import { useNavigation } from '../../../navigator/useNavigation';

const styles = StyleSheet.create({
    header: {
        marginBottom: 50,
    },
    field: {
        width: '100%',
        margin: 25,
    },
    button: {
        margin: 40,
        width: '100%',
    },
    typo: {
        color: 'white',
    },
});

function AuthLogin(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <LoginForm onSignIn={() => navigation.navigate('/Home')} />
            <View>
                <Typography variant="subtext" style={styles.typo}>
                    Don&apos;t have a Kogo account yet?&nbsp;
                    <Typography
                        variant="subtext"
                        style={{
                            ...styles.typo,
                            textDecorationLine: 'underline',
                        }}
                        onPress={() => navigation.navigate('/Signup')}>
                        Sign Up
                    </Typography>
                </Typography>
            </View>
        </View>
    );
}

export default AuthLogin;
