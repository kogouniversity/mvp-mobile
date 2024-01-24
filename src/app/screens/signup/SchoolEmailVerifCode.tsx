import { Dimensions, View } from 'react-native';
import Typography from '../../atoms/Typography';
import TextField from '../../atoms/inputs/TextField';
import Button from '../../atoms/Button';
import styles from './styles';
import { useNavigation } from '../../utils/navigation';

function SchoolEmailVerifCode(): JSX.Element {
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
                        Enter your verification code
                    </Typography>
                </View>
                <View style={styles.field}>
                    <TextField
                        variant="standard"
                        placeholder=""
                        placeholderTextColor="white"
                    />
                </View>
                <View style={styles.button}>
                    <Button
                        variant="default"
                        size="md"
                        text="Submit"
                        style={{ backgroundColor: 'lightgray' }}
                        onPress={() => navigation.navigate('NewUserSignUp', {})}
                    />
                </View>
            </View>
        </View>
    );
}

export default SchoolEmailVerifCode;
