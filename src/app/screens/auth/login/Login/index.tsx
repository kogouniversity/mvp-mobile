import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useAuthStore } from '../../../../../store/auth';
import { AuthUserDataResponse } from '../../../../../store/types';
import LoginForm from '../../../../components/login/LoginForm';

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

function Login(): JSX.Element {
    const navigation = useNavigation();

    const handleSignIn = (user: AuthUserDataResponse) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            }),
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.ball}>
                <LoginForm onSignIn={handleSignIn} />
            </View>
        </View>
    );
}

export default Login;
