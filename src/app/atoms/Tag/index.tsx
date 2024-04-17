import { StyleSheet, View } from 'react-native';
import { TagProps } from './types';
import Typography from '../Typography';
import Button from '../Button';

const styles = StyleSheet.create({
    container: {
        borderRadius: 999,
        backgroundColor: '#d3d3d3',
        paddingHorizontal: 10,
        paddingVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    delButton: {
        width: 'auto',
        height: 'auto',
        paddingLeft: 5,
    },
});

const Tag: React.FC<TagProps> = function ({ style, children, onPress }) {
    return (
        <View style={[styles.container, style]}>
            <Typography variant="text"># {children}</Typography>
            <Button variant="tertiary" size="md" label="X" style={styles.delButton} onPress={onPress} />
        </View>
    );
};

export default Tag;
