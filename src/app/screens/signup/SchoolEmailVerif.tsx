import { CommonActions } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/inputs/TextField';
import Button from '../../atoms/Button';
import styles from './styles';
import { useNavigation } from '../../utils/navigation';

function SchoolEmailVerif(): JSX.Element {
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
                        Enter your school email
                    </Typography>
                </View>
                <View style={styles.field}>
                    <TextField
                        variant="standard"
                        placeholder="email"
                        placeholderTextColor="white"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        variant="default"
                        size="md"
                        text="Submit"
                        style={{ backgroundColor: 'lightgray' }}
                        onPress={() =>
                            navigation.navigate('SchoolEmailVerifCode', {})
                        }
                    />
                </View>
                <View>
                    <Typography variant="body1" style={styles.typo}>
                        Or, if you already have an account,&nbsp;
                        <Typography
                            variant="body1"
                            style={{
                                ...styles.typo,
                                textDecorationLine: 'underline',
                            }}
                            onPress={() =>
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: 'Login' }],
                                    }),
                                )
                            }>
                            log in
                        </Typography>
                    </Typography>
                </View>
            </View>
        </View>
    );
}

export default SchoolEmailVerif;
