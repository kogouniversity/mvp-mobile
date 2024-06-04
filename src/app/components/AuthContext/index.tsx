import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useUserInformation } from '../../hooks/api/user/useUserInformation';

interface AuthContextType {
    userToken: string | null;
    setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [userToken, setUserToken] = useState<string | null>(null);
    const { data: userInfo, isLoading } = useUserInformation(userToken ?? '');

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync('userToken');
            setUserToken(token);
        };
        loadToken();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ userToken, setUserToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
