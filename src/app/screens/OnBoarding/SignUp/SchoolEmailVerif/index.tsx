import { CommonActions, useNavigation } from '@react-navigation/native';
import { Dimensions, View } from 'react-native';
import { SVG } from '../../../../utils/assets';
import Typography from '../../../../components/commons/Typography';
import TextField from '../../../../components/inputs/TextField';
import Button from '../../../../components/commons/Button';
import styles from '../style';
import { SignUpNavigationProps } from '../types';

function SchoolEmailVerif(): JSX.Element {
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
