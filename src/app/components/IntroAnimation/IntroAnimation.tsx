import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const IntroAnimation: React.FC = () => {
    const animationValue = useRef(new Animated.Value(0)).current;
    const sproutMove = useRef(new Animated.Value(0)).current;
    const sproutTilt = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(animationValue, {
                toValue: 0.8,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(animationValue, {
                toValue: 0.5,
                friction: 3,
                useNativeDriver: true,
            }),
            Animated.timing(animationValue, {
                toValue: 6.3,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(animationValue, {
                toValue: 6.2,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();

        Animated.sequence([
            Animated.timing(sproutTilt, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(sproutMove, {
                    toValue: -1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(sproutTilt, {
                    toValue: -1,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]),
        ]).start();

        setTimeout(() => {
            Animated.parallel([
                Animated.timing(sproutMove, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(sproutTilt, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                }),
            ]).start();
        }, 1650);
    }, []);

    const ballStyle = {
        transform: [{ scale: animationValue }],
    };

    const sproutStyle = {
        bottom: 15,
        right: -45,
        width: 10,
        height: 25,
        backgroundColor: '#00FF00',
        borderRadius: 5,
        transform: [
            {
                translateX: sproutMove.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: [-30, 0, 80],
                }),
            },
            {
                rotate: sproutTilt.interpolate({
                    inputRange: [-1, 0, 1],
                    outputRange: ['-30deg', '0deg', '30deg'],
                }),
            },
        ],
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.ball, ballStyle]}>
                <Animated.View style={sproutStyle} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ball: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D90166',
    },
});

export default IntroAnimation;
