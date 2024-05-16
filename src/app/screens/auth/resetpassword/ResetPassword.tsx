import { View, StyleSheet } from 'react-native';
import ResetPasswordForm from '../../../components/signup/ResetPasswordForm';
import Typography from '../../../atoms/Typography';

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
});

function ResetPassword(): JSX.Element {
    const handleSubmit = (confirm: string) => {
        console.log(confirm);
    };

    return (
        <View style={styles.container}>
            <Typography variant="subtitle" color="text" style={styles.title}>
                Reset your password
            </Typography>
            <Typography variant="text">
                Enter your username or email, and we’ll send you a code to reset your password
            </Typography>
            <ResetPasswordForm onSubmit={confirm => handleSubmit(confirm)} />
        </View>
    );
}

export default ResetPassword;
