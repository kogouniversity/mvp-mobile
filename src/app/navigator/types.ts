type RootStackParamList = {
    IntroNav: undefined;
    HomeNav: undefined;
};

type IntroStackParamList = {
    Intro: object | undefined;
    AuthLogin: object | undefined;
    SignUpNav: undefined;
};

type SignupStackParamList = {
    AuthSignupIdAndPassword: object | undefined;
    AuthSignupEmailInput: object | undefined;
    AuthSignupEmailVerification: { email: string };
};

type HomeTabParamList = {
    HomeFeed: object | undefined;
    HomeMyGroup: object | undefined;
    HomeGadget: object | undefined;
    HomeExplore: object | undefined;
    HomeProfile: object | undefined;
};

export type NavigationParamList = RootStackParamList & IntroStackParamList & SignupStackParamList & HomeTabParamList;
