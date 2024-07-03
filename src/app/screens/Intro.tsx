import React, { useState, useEffect } from 'react';
import { View, Image, Dimensions, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '../navigator/useNavigation';
import Swiper from 'react-native-swiper';

function Intro(): JSX.Element {
    const [currentLogo, setCurrentLogo] = useState(require('../assets/images/logo_.png'));
    const [showTabs, setShowTabs] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const firstTimeout = setTimeout(() => {
            setCurrentLogo(require('../assets/images/logo.png'));
        }, 1500);

        const secondTimeout = setTimeout(() => {
            setShowTabs(true);
        }, 2500);

        return () => {
            clearTimeout(firstTimeout);
            clearTimeout(secondTimeout);
        };
    }, []);

    const navigateToLogin = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }],
            }),
        );
    };

    if (showTabs) {
        return (
            <Swiper loop={false}>
                <View style={styles.slide}>
                    <Image style={styles.image} source={require('../assets/images/tab1.png')} />
                    <Text style={styles.text}>Organize your courses, plans, more</Text>
                </View>
                <View style={styles.slide}>
                    <Image style={styles.image} source={require('../assets/images/tab2.png')} />
                    <Text style={styles.text}>Connect with other students in {'\n'}20+ Canadian Universities</Text>
                </View>
                <View style={styles.slide}>
                    <Image style={styles.logo} source={require('../assets/images/logo.png')} />
                    <Text style={styles.text}>Broaden your university life</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                            <Text style={styles.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={navigateToLogin}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Swiper>
        );
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={currentLogo} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo: {
        width: 100,
        height: 42,
        resizeMode: 'stretch',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: Dimensions.get('window').width * 0.8,
        height: Dimensions.get('window').width * 0.8,
        resizeMode: 'contain',
    },
    text: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    button: {
        width: '80%',
        padding: 15,
        backgroundColor: '#000',
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Intro;
