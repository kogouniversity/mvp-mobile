import { View, StyleSheet, TouchableOpacity } from 'react-native';
import UploadImage from '../../../atoms/UploadImage';

const styles = StyleSheet.create({
    container: {
        borderRadius: 999,
        backgroundColor: '#50B1EE',
        padding: 10,
        height: 120,
        width: 120,
    },
    button: {
        position: 'absolute',
        bottom: 5,
        right: 5,
    },
});

function GroupImage(): JSX.Element {
    const chooseImage = () => {};
    return (
        <TouchableOpacity onPress={chooseImage}>
            <View style={styles.container}>
                <UploadImage variant="mini" style={styles.button} />
            </View>
        </TouchableOpacity>
    );
}

export default GroupImage;
