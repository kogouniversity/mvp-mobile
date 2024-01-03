import { View, Image, Dimensions } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { ImageSrc, SVG } from '../../../utils/assets';
import { OnBoardingNavigationProps } from '../types';

function Intro(): JSX.Element {
    const navigation = useNavigation<OnBoardingNavigationProps>();
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
            <SVG.Bg1
                style={{
                    position: 'absolute',
                    top: Dimensions.get('window').height / 2 - 350,
                }}
            />
            <Image
                style={{
                    position: 'absolute',
                    top: Dimensions.get('window').height / 2 - 150,
                }}
                source={ImageSrc.alienAstronaut}
            />
        </View>
    );
}

export default Intro;
