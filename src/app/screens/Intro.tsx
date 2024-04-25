import { View, Image, Dimensions } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useEffect } from 'react';
import { ImageSrcUrl } from '../utils/images';
import { useNavigation } from '../navigator/useNavigation';

function Intro(): JSX.Element {
    const navigation = useNavigation();
    useEffect(() => {
        const screenWaitTimeout = setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                }),
            );
        }, 5000);

        return () => clearTimeout(screenWaitTimeout);
    }, [navigation]);
    return (
        <View
            style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
            }}>
            <Image
                style={{
                    position: 'absolute',
                    top: Dimensions.get('window').height / 2 - 150,
                }}
                source={ImageSrcUrl.alienAstronaut}
            />
        </View>
    );
}

export default Intro;
