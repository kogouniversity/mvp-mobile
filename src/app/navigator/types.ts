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
    IdAndPasswordInput: object | undefined;
    EmailInput: { username: string; password: string; email: string };
    EmailVerificationInput: { email: string };
};

type MainTabParamList = {
    Home: object | undefined;
    MySchool: object | undefined;
    NewPost: object | undefined;
    Explore: object | undefined;
    Profile: object | undefined;
};

export type NavigationParamList = RootStackParamList &
    OnBoardingStackParamList &
    SignUpStackParamList &
    MainTabParamList;
