import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    NativeSyntheticEvent,
    ViewStyle,
    TextInputChangeEventData,
    TextInputKeyPressEventData,
} from 'react-native';
import { Noop } from 'react-hook-form';
import TextField from '../../atoms/TextField';
import Typography from '../../atoms/Typography';
import Tag from '../../atoms/Tag';

export type TagInputProps = {
    setTagValues: React.Dispatch<React.SetStateAction<string[]>>;
    onChangeText: (...evemt: unknown[]) => unknown;
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

const TagInput: React.FC<TagInputProps> = function ({ setTagValues, onChangeText, onBlur, style }) {
    const [tags, setTags] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setInput(e.nativeEvent.text);

        if (e.nativeEvent.text.charAt(e.nativeEvent.text.length - 1) === ' ') {
            // check if the input already exists
            if (tags.includes(input) === false) {
                setTags([...tags, input]);
                setTagValues([...tags, input]);
            }
            setInput('');
        }
    };

    const handleKeydown = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        if (e.nativeEvent.key === 'Backspace' && input.length === 0) {
            tags.pop();
            setTags([...tags]);
            setTagValues([...tags]);
        }
    };

    const deleteTag = (name: string) => {
        const filtered = tags.filter(tag => tag !== name);
        setTags(filtered);
    };

    return (
        <View style={style}>
            <View style={styles.tagsContainer}>
                {tags.map(tag => (
                    <Tag style={styles.tags} onPress={() => deleteTag(tag)}>
                        {tag}
                    </Tag>
                ))}
                <TextField
                    variant="standard"
                    placeholder="#"
                    value={input}
                    style={
                        tags.length > 0
                            ? tags.length < 5
                                ? styles.textField
                                : styles.hiddenTextField
                            : styles.extended
                    }
                    onChange={handleInput}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    editable={tags.length < 5}
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
