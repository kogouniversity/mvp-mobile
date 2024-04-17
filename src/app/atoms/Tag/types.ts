import { ViewStyle } from 'react-native';

export type TagProps = {
    style?: ViewStyle;
    children: string;
    onPress: () => void;
};
