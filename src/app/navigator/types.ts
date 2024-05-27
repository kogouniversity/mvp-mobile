export type ScreenRouteParams = {
    SignupEmailInput: { username: string; password: string };
    SignupEmailVerification: { email: string };
    GroupFeed: { groupId: string | number };
};

export type NavigationParamList = {
    '/': undefined;
    '/Login': undefined;
    '/Signup': undefined;
    '/Signup/EmailInput': ScreenRouteParams['SignupEmailInput'];
    '/Signup/EmailVerification': ScreenRouteParams['SignupEmailVerification'];
    '/Home': undefined;
    '/Home/Feed': undefined;
    '/Home/MyGroups': undefined;
    '/Home/MyGroups/Feed': ScreenRouteParams['GroupFeed'];
    '/Home/Gadget': undefined;
    '/Home/GroupExplore': undefined;
    '/Home/GroupExplore/CreateNewGroup': undefined;
    '/Home/Profile': undefined;
};
