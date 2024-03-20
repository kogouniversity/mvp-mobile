import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '../../utils/navigation';
import MyGroupList from '../../components/group/MyGroupList';
import Typography from '../../atoms/Typography';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
    headerWrapper:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 50,
    },
    arrow:{
        paddingTop: 3,
        paddingLeft: 27,
        position: 'absolute',
        left: 0,
    },
    header: {
        textAlign: 'center',
    },
    field: {
        width: '100%',
        margin: 25,
    },
});

function MyGroup(): JSX.Element {
    const userId: string = '3'; // Define userId here
    const navigation = useNavigation();
    return (
        <View style={{ alignItems: 'center' }}>
            <View style={styles.headerWrapper}>
                <Ionicons name="arrow-back" size={27} color="#000000" style={styles.arrow} onPress={() => alert('Navigating to Home Screen')}/>
                <Typography variant="title" style={styles.header}>
                    My Groups
                </Typography>
            </View>
            <MyGroupList userId={userId} />
        </View>
    );
}

export default MyGroup;