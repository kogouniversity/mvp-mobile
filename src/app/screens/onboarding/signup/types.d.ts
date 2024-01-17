export type SignUpStackParamList = {
    SchoolEmailVerif: object;
    SchoolEmailVerifCode: object;
    NewUserSignUp: object;
};

export type SignUpNavigationProps =
    NativeStackNavigationProp<SignUpStackParamList>;
