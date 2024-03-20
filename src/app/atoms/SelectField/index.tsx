import React, { useState, useRef } from 'react';
import { Modal, View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SelectFieldProps, OptionType } from './types';

const SelectField: React.FC<SelectFieldProps> = function ({ label, data, onSelect }) {
    const [visible, setVisible] = useState(false);
    const [selectTop, setSelectTop] = useState(0);
    const [buttonMeasurements, setButtonMeasurements] = useState({
        top: 0,
        left: 0,
        width: 0,
    });
    const SelectButton = useRef<TouchableOpacity>(null);
    const [selectedItem, setSelectedItem] = useState<OptionType | null>(null);

    const toggleSelect = (): void => {
        if (visible) {
            setVisible(false);
        } else {
            openSelect();
        }
    };

    const openSelect = (): void => {
        SelectButton.current?.measure(
            (fx: number, fy: number, width: number, height: number, px: number, py: number) => {
                setSelectTop(py + height);
                setButtonMeasurements({ top: py, left: px, width });
                setVisible(true);
            },
        );
    };

    const onItemPress = (item: OptionType): void => {
        onSelect(item);
        setSelectedItem(item);
        setVisible(false);
    };

    const renderItem = ({ item }: { item: OptionType }): React.ReactElement => (
        <TouchableOpacity
            style={[styles.item]}
            onPress={() => onItemPress(item)}>
            <Text>{item.label}</Text>
        </TouchableOpacity>
    );

    return (
        <View>
            <TouchableOpacity
                ref={SelectButton}
                style={[styles.button, { width: buttonMeasurements.width || '30%' }]}
                onPress={toggleSelect}>
                <Text style={[styles.buttonText, selectedItem ? styles.selectedItem : {}]}>
                    {selectedItem ? selectedItem.label : label}
                </Text>
                <AntDesign name={visible ? 'caretup' : 'caretdown'} size={24} color="black" style={styles.caretIcon} />
            </TouchableOpacity>
            {visible && (
                <Modal visible={visible} transparent animationType="none">
                    <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                        <View
                            style={[
                                styles.select,
                                {
                                    top: selectTop,
                                    left: buttonMeasurements.left,
                                    width: buttonMeasurements.width,
                                },
                            ]}>
                            <FlatList data={data} renderItem={renderItem} keyExtractor={item => item.value} />
                        </View>
                    </TouchableOpacity>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: 'transparent',
        alignSelf: 'center',
       
    },
    buttonText: {
        flex: 1,
        textAlign: 'left',
    },
    selectedItem: {
        textDecorationLine: 'underline',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
    },
    select: {
        position: 'absolute',
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    item: {
        padding: 10,
        backgroundColor: 'white',
    },
    caretIcon: {
        marginHorizontal: 0,
        padding: 0,
    },
});

export default SelectField;
