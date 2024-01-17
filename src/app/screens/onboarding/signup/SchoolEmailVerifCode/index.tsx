import { useNavigation } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import { SVG } from '../../../../utils/assets';
import Typography from '../../../../atoms/Typography';
import TextField from '../../../../atoms/inputs/TextField';
import Button from '../../../../atoms/Button';
import styles from '../style';
import { SignUpNavigationProps } from '../types';

function SchoolEmailVerifCode(): JSX.Element {
    const navigation = useNavigation<SignUpNavigationProps>();
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
