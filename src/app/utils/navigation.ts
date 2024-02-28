import { RouteProp, useNavigation as useNavigationImpl, useRoute as useRouteImpl } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../navigator/types';

export type NavigationProps = NativeStackNavigationProp<NavigationParamList>;

export const useNavigation = useNavigationImpl<NavigationProps>;

export function useRoute<T extends keyof NavigationParamList>(): ReturnType<
    typeof useRouteImpl<RouteProp<NavigationParamList, T>>
> {
    return useRouteImpl<RouteProp<NavigationParamList, T>>();
}
