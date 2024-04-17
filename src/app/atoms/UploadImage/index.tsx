import { View, ViewStyle } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { UploadImageProps, UploadImageVariants } from './types';

const uploadImageVariantStyles: Record<UploadImageVariants, ViewStyle> = {
    standard: {
        padding: 0,
    },
    mini: {
        borderRadius: 999,
        backgroundColor: '#d3d3d3',
        padding: 7,
        height: 30,
        width: 30,
    },
};

const UploadImage: React.FC<UploadImageProps> = function ({ variant, style = {} }) {
    return (
        <View style={[uploadImageVariantStyles[variant], style]}>
            {variant === 'standard' ? (
                <FontAwesome name="camera" size={24} color="black" />
            ) : (
                <FontAwesome name="camera" size={15} color="white" />
            )}
        </View>
    );
};

export default UploadImage;
