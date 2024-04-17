import { ViewStyle } from 'react-native';

export type UploadImageVariants = 'standard' | 'mini';

export type UploadImageProps = {
    variant: UploadImageVariants;
    style?: ViewStyle;
};
