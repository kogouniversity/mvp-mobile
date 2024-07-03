import React, { useContext, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../navigator/types';
import { AntDesign } from '@expo/vector-icons';
import { useAuthStore } from '../../../store/auth';
import AuthContext from '../../../store/AuthContext';

function Support(): JSX.Element {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const bounceAnim = useRef(new Animated.Value(0)).current;
    const clearAuth = useAuthStore(state => state.clearAuth);
    const navigation = useNavigation<NativeStackNavigationProp<NavigationParamList, 'MyPosts'>>();
    const { signOut } = useContext(AuthContext)?.authContext || {};

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(bounceAnim, {
                        toValue: 1,
                        duration: 500,
                        easing: Easing.bounce,
                        useNativeDriver: true,
                    }),
                    Animated.timing(bounceAnim, {
                        toValue: -1,
                        duration: 500,
                        easing: Easing.bounce,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        });
    }, [fadeAnim, bounceAnim]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handlePressLogout = async () => {
        if (signOut) {
            await signOut();
            clearAuth();
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        }
    };

    const translateX = bounceAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-50, 50],
    });

    const translateY = bounceAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-50, 50],
    });

    return (
        <SafeAreaView style={styles.safeArea}>
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <AntDesign name="left" size={27} color="black" />
            </TouchableOpacity>
            <View style={styles.container}>
                <TouchableOpacity onPress={handlePressLogout}>
                    <Animated.Text
                        style={[
                            styles.text,
                            {
                                opacity: fadeAnim,
                                transform: [{ translateX }, { translateY }],
                            },
                        ]}>
                        우린 그딴거 없슈
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    backButton: {
        margin: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: '600',
        color: '#4A90E2',
        textAlign: 'center',
        padding: 15,
        borderWidth: 2,
        borderColor: '#4A90E2',
        borderRadius: 10,
        backgroundColor: '#F0F8FF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Support;
