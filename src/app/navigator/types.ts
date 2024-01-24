type RootStackParamList = {
    OnBoarding: object | undefined;
    Login: object | undefined;
    Main: object | undefined;
};

type OnBoardingStackParamList = {
    Intro: object | undefined;
    Login: object | undefined;
    SignUp: object | undefined;
};

type SignUpStackParamList = {
    SchoolEmailVerif: object | undefined;
    SchoolEmailVerifCode: object | undefined;
    NewUserSignUp: object | undefined;
};

type MainTabParamList = {
    Home: object | undefined;
    Feed: object | undefined;
    Tools: object | undefined;
    Profile: object | undefined;
};

export type NavigationParamList = RootStackParamList &
    OnBoardingStackParamList &
    SignUpStackParamList &
    MainTabParamList;
