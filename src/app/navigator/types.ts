import { RouteProp, useRoute as useRouteImpl } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { stackParserFromStackParserOptions } from '@sentry/utils';

export type ScreenRouteParams = {
    SignupEmailInput: { username: string; password: string };
    SignupEmailVerification: { email: string };
    GroupFeed: { groupId: string | number };
};

export type NavigationParamList = {
    '/': undefined;
    '/Login': undefined;
    '/Signup': undefined;
    '/Signup/EmailInput': { username: string; password: string };
    '/Signup/EmailVerification': { email: string };
    '/Home': undefined;
    FeedTab: { savedActiveTab?: string; savedFilter?: string };
    MyGroupsTab: undefined;
    'MyGroupsTab/Feed': undefined;
    GadgetTab: undefined;
    ProfileTab: undefined;
    PostDetails: { postID: string; savedActiveTab?: string; savedFilter?: string };
    GroupPostDetails: { postID: string };
    GroupFeed: { groupId: string | number };
    CreateNewPost: undefined;
    CreateNewGroup: undefined;
    MyPosts: undefined;
};

export type RootStackParamList = {
    FeedTab: { savedActiveTab?: string; savedFilter?: string };
    PostDetails: { postID: string; savedActiveTab?: string; savedFilter?: string };
    GroupPostDetails: { postID: string };
};

export function useRoute<T extends keyof NavigationParamList>(): ReturnType<
    typeof useRouteImpl<RouteProp<NavigationParamList, T>>
> {
    return useRouteImpl<RouteProp<NavigationParamList, T>>();
}

export type PostDetailsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GroupPostDetails'>;

export type PostDetailsRouteProp = RouteProp<RootStackParamList, 'GroupPostDetails'>;
