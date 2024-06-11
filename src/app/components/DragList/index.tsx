import React, { useRef } from 'react';
import { View, StyleSheet, Text, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

export type DraggableListItemProps = {
    onLeavePress: () => void;
    children: React.ReactNode;
};

const DraggableListItem: React.FC<DraggableListItemProps> = ({ children, onLeavePress }) => {
    const pan = useRef(new Animated.Value(0)).current;
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
            },
            onPanResponderMove: (evt, gestureState) => {
                if (gestureState.dx < 0) {
                    pan.setValue(gestureState.dx);
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if (gestureState.dx < -SCREEN_WIDTH * 0.25) {
                    Animated.spring(pan, {
                        toValue: -SCREEN_WIDTH * 0.25,
                        useNativeDriver: false,
                    }).start();
                } else {
                    Animated.spring(pan, {
                        toValue: 0,
                        useNativeDriver: false,
                    }).start();
                }
            },
            onPanResponderTerminationRequest: () => false,
        }),
    ).current;

    const handlePressLeave = () => {
        Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: false,
        }).start();
        onLeavePress();
    };

    return (
        <View style={styles.container}>
            <View style={styles.hiddenButtonContainer}>
                <TouchableOpacity onPress={handlePressLeave} style={styles.leaveButton}>
                    <Text style={styles.leaveButtonText}>Leave</Text>
                </TouchableOpacity>
            </View>
            <Animated.View
                style={[styles.animatedContainer, { transform: [{ translateX: pan }] }]}
                {...panResponder.panHandlers}>
                {children}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        position: 'relative',
    },
    hiddenButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    leaveButton: {
        backgroundColor: 'red',
        width: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    leaveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    animatedContainer: {
        backgroundColor: 'white',
        borderRadius: 5,
        overflow: 'hidden',
    },
});

export default DraggableListItem;
