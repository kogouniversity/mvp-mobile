import { Dimensions, View } from 'react-native';
import { SVG } from '../../utils/assets';
import Typography from '../../components/commons/Typography';

function Login(): JSX.Element {
    return (
        <View style={{ alignItems: 'center' }}>
            <SVG.BgFull1
                style={{
                    position: 'absolute',
                    top: 50,
                }}
            />
            <View style={{ marginTop: Dimensions.get('window').height * 0.3 }}>
                <Typography variant="h6" style={{ color: 'white' }}>
                    Log in
                </Typography>
            </View>
        </View>
    );
}

export default Login;
