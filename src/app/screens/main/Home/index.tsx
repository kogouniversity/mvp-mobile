import { View, StyleSheet } from 'react-native';
import Typography from '../../../components/commons/Typography';

const styles = StyleSheet.create({
    wave: {
        position: 'absolute',
        width: 681,
        height: 187,
        top: 0,
        background: '#171C47',
    },
});

function Home(): JSX.Element {
    return (
        <View>
            <View style={styles.wave} />
            <Typography variant="h6">Home</Typography>
        </View>
    );
}

export default Home;
