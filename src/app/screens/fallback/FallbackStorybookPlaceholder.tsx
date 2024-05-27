import React from 'react';
import { View } from 'react-native';
import Typography from '../../atoms/Typography';

interface FallbackStorybookPlaceholderProps {
    screenTitle: string;
    screenMessage?: string;
}
const FallbackStorybookPlaceholder: React.FC<FallbackStorybookPlaceholderProps> = function ({
    screenTitle,
    screenMessage = '',
}) {
    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Typography variant="title">{screenTitle}</Typography>
            <Typography variant="subtitle">{screenMessage}</Typography>
        </View>
    );
};

export default FallbackStorybookPlaceholder;
