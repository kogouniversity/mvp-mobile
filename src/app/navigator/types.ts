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
    EmailInput: object | undefined;
    EmailVerificationInput: { email: string };
    IdAndPasswordInput: { email: string; emailToken: string };
};

type MainTabParamList = {
    Home: object | undefined;
    MySchool: object | undefined;
    Explore: object | undefined;
    Profile: object | undefined;
};

export type NavigationParamList = RootStackParamList &
    OnBoardingStackParamList &
    SignUpStackParamList &
    MainTabParamList;
