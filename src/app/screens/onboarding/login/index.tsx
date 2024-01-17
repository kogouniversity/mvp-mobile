import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SVG } from '../../../utils/assets';
import Typography from '../../../atoms/Typography';
import TextField from '../../../atoms/inputs/TextField';
import Button from '../../../atoms/Button';
import { OnBoardingNavigationProps } from '../types';

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

function Login(): JSX.Element {
    const navigation = useNavigation<OnBoardingNavigationProps>();
    return (
        <View style={{ alignItems: 'center' }}>
            <SVG.BgFull1
                style={{
                    position: 'absolute',
                    top: 50,
                }}
            />
            <View
                style={{
                    marginTop: Dimensions.get('window').height * 0.3,
                    width: Dimensions.get('window').width * 0.7,
                    alignItems: 'center',
                }}>
                <View style={styles.header}>
                    <Typography variant="h6" style={styles.typo}>
                        Log in
                    </Typography>
                </View>
                <View style={styles.field}>
                    <TextField
                        variant="standard"
                        placeholder="id"
                        placeholderTextColor="white"
                    />
                </View>
                <View style={styles.field}>
                    <TextField
                        variant="standard"
                        placeholder="password"
                        placeholderTextColor="white"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        variant="default"
                        size="md"
                        text="Login"
                        style={{ backgroundColor: 'lightgray' }}
                    />
                </View>
                <View>
                    <Typography variant="body1" style={styles.typo}>
                        Don&apos;t have a Kogo account yet?&nbsp;
                        <Typography
                            variant="body1"
                            style={{
                                ...styles.typo,
                                textDecorationLine: 'underline',
                            }}
                            onPress={() => navigation.navigate('SignUp', {})}>
                            Sign Up
                        </Typography>
                    </Typography>
                </View>
            </View>
        </View>
    );
}

export default Login;
