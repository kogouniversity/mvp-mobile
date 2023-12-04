import { Text as TextComponent, TextProps } from 'react-native';
import { material } from 'react-native-typography';

function Text(props: TextProps): React.JSX.Element {
    const { style } = props;
    const styleOverride = [material.display1];
    if (style) {
        if (Array.isArray(style)) styleOverride.concat(style);
        else styleOverride.push(style);
    }
    return <TextComponent {...props} style={styleOverride} />;
}

export default Text;
