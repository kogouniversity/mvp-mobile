export type ComponentRouteParam = {
    AuthSignupEmailInput: { username: string; password: string };
    AuthSignupEmailVerification: { email: string };
    GroupMyGroupFeed: { groupId: string | number };
};

export type NavigationParamList = {
    '/': undefined;
    '/Login': undefined;
    '/Signup': undefined;
    '/Signup/EmailInput': ComponentRouteParam['AuthSignupEmailInput'];
    '/Signup/EmailVerification': ComponentRouteParam['AuthSignupEmailVerification'];
    '/Home': undefined;
    '/Home/Feed': undefined;
    '/Home/MyGroups': undefined;
    '/Home/MyGroups/GroupMyGroupFeed': ComponentRouteParam['GroupMyGroupFeed'];
    '/Home/Gadget': undefined;
    '/Home/GroupExplore': undefined;
    '/Home/GroupExplore/NewGroup': undefined;
    '/Home/Profile': undefined;
};
