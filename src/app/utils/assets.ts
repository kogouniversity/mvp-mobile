import { ImageSourcePropType } from 'react-native';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';

// Image preload
import alienAstronaut from '../../../assets/images/alienAstronaut.png';

// SVG preload
import Bg1 from '../../../assets/images/bg_1.svg';
import BgFull1 from '../../../assets/images/bg_full_1.svg';

export const ImageSrc: Record<string, ImageSourcePropType> = {
    alienAstronaut,
};

export const SVG: Record<string, React.ComponentType<ViewProps>> = {
    Bg1,
    BgFull1,
};
