import { CommonActions } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import styles from './styles';
import { useNavigation } from '../../utils/navigation';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/inputs/TextField';
import Button from '../../atoms/Button';

function NewUserSignUp(): JSX.Element {
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <View
                style={{
                    marginTop: Dimensions.get('window').height * 0.3,
                    width: Dimensions.get('window').width * 0.7,
                    alignItems: 'center',
                }}>
                <View style={styles.header}>
                    <Typography variant="h6" style={styles.typo}>
                        Sign up
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
                        onPress={() =>
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'Main' }],
                                }),
                            )
                        }
                    />
                </View>
            </View>
        </View>
    );
}

export default NewUserSignUp;
