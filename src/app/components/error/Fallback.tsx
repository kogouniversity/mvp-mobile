import { View } from 'react-native';
import Typography from '../../atoms/Typography';

function Fallback(): React.JSX.Element {
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Typography variant="h6">An error has occurred</Typography>
        </View>
    );
}

export default Fallback;
