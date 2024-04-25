import { useNavigation as useNavigationImpl } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from './types';

export type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

export const useNavigation = useNavigationImpl<NavigationProps>;
