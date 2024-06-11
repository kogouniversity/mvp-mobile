import { RouteProp, useRoute as useRouteImpl } from '@react-navigation/native';
import { NavigationParamList } from './types';

export function useRoute<T extends keyof NavigationParamList>(): ReturnType<
    typeof useRouteImpl<RouteProp<NavigationParamList, T>>
> {
    return useRouteImpl<RouteProp<NavigationParamList, T>>();
}
