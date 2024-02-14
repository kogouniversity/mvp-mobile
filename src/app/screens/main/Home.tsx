import { View, StyleSheet } from 'react-native';
import Typography from '../../atoms/Typography';

const styles = StyleSheet.create({
    wave: {
        position: 'absolute',
        width: 681,
        height: 187,
        top: 0,
        backgroundColor: '#171C47',
    },
});

function Home(): JSX.Element {
    return (
        <View>
            <View style={styles.wave} />
            <Typography variant="title">Home</Typography>
        </View>
    );
}

export default Home;
