import { View, StyleSheet } from 'react-native';
import Typography from '../../../atoms/Typography';
import EmailInputForm from '../../../components/signup/EmailInputForm';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 40,
    },
    title: {
        textAlign: 'center',
        marginBottom: 20,
    },
    descrptn: {
        textAlign: 'center',
        marginBottom: 20,
    },
});

function ResetPasswordEmail(): JSX.Element {
    const handleSubmit = (confirm: string) => {
        console.log(confirm);
    };

    return (
        <View style={styles.container}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Reset your password
            </Typography>
            <Typography variant="subtext" style={styles.descrptn}>
                Enter your username or email, and we’ll send you a code to reset your password
            </Typography>
            <EmailInputForm onSubmit={confirm => handleSubmit(confirm)} />
        </View>
    );
}

export default ResetPasswordEmail;
