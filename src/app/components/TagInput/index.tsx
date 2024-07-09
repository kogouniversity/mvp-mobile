import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    NativeSyntheticEvent,
    ViewStyle,
    TextInputChangeEventData,
    TextInputKeyPressEventData,
    TextStyle,
} from 'react-native';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import Tag from '../../atoms/Tag';
import { Noop } from 'react-hook-form';

export type TagInputProps = {
    setTagValues: React.Dispatch<React.SetStateAction<string[]>>;
    value: string[];
    onChangeText: (tags: string[]) => void;
    onBlur: Noop;
    style: ViewStyle;
};

const styles = StyleSheet.create({
    textField: {
        borderColor: 'transparent',
    },
    extended: {
        width: 50,
        borderColor: 'transparent',
    },
    hiddenTextField: {
        display: 'none',
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tags: {
        marginRight: 5,
    },
});

const TagInput: React.FC<TagInputProps> = function ({ setTagValues, value, onChangeText, onBlur, style }) {
    const [input, setInput] = useState<string>('');

    const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setInput(e.nativeEvent.text);

        if (e.nativeEvent.text.charAt(e.nativeEvent.text.length - 1) === ' ') {
            const newTag = input.trim();
            if (newTag && !value.includes(newTag)) {
                const newTags = [...value, newTag];
                setTagValues(newTags);
                onChangeText(newTags);
            }
            setInput('');
        }
    };

    const handleKeydown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (e.nativeEvent.key === 'Backspace' && input.length === 0) {
            const newTags = value.slice(0, -1);
            setTagValues(newTags);
            onChangeText(newTags);
        }
    };

    const deleteTag = (name: string) => {
        const filtered = value.filter(tag => tag !== name);
        setTagValues(filtered);
        onChangeText(filtered);
    };

    let textStyle: TextStyle = styles.extended;
    if (value.length > 0) {
        textStyle = value.length < 5 ? styles.textField : styles.hiddenTextField;
    }

    return (
        <View style={style}>
            <View style={styles.tagsContainer}>
                {value.map(tag => (
                    <Tag key={tag} style={styles.tags} onPress={() => deleteTag(tag)}>
                        {tag}
                    </Tag>
                ))}
                <TextField
                    variant="standard"
                    placeholder="#"
                    value={input}
                    style={textStyle}
                    onChange={handleInput}
                    onBlur={onBlur}
                    editable={value.length < 5}
                    onKeyPress={handleKeydown}
                />
            </View>
            <Typography variant="subtext" color="subtext">
                (max. 5 tags)
            </Typography>
        </View>
    );
};

export default TagInput;
