import { RouteProp, useRoute as useRouteImpl } from '@react-navigation/native';
import { ComponentRouteParam } from './types';

export function useRoute<T extends keyof ComponentRouteParam>(): ReturnType<
    typeof useRouteImpl<RouteProp<ComponentRouteParam, T>>
> {
    return useRouteImpl<RouteProp<ComponentRouteParam, T>>();
}
