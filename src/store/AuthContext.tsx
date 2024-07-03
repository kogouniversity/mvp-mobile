import React, { createContext, useReducer, useEffect, ReactNode, useMemo } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useAuthStore } from './auth';
import { AuthUserDataResponse } from '../app/hooks/api/auth/types';

interface AuthState {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | undefined;
}

interface AuthContextProps {
    state: AuthState;
    authContext: {
        signIn: (data: { identifier: string; password: string }) => Promise<AuthUserDataResponse>;
        signOut: () => Promise<void>;
    };
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const authReducer = (state: AuthState, action: { type: string; token?: string }): AuthState => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...state,
                userToken: action.token ?? undefined,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...state,
                isSignout: false,
                userToken: action.token ?? undefined,
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignout: true,
                userToken: undefined,
            };
        default:
            return state;
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isLoading: true,
        isSignout: false,
        userToken: undefined,
    });

    const setJwt = useAuthStore(storeState => storeState.setJwt);
    const setUserName = useAuthStore(storeState => storeState.setUserName);

    useEffect(() => {
        const bootstrapAsync = async () => {
            let userToken: string | undefined;

            try {
                const token = await SecureStore.getItemAsync('userToken');
                if (token) {
                    const response = await axios.get('/api/users/me', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (response.status === 200) {
                        userToken = token;
                        setJwt(token);
                        setUserName(response.data.username);
                    }
                }
            } catch {
                userToken = undefined;
            }

            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };

        bootstrapAsync();
    }, [setJwt, setUserName]);

    const authContext = useMemo(
        () => ({
            signIn: async (data: { identifier: string; password: string }): Promise<AuthUserDataResponse> => {
                const response = await axios.post('/api/auth/local', data);
                const userToken = response.data.jwt;

                await SecureStore.setItemAsync('userToken', userToken);
                setJwt(userToken);
                setUserName(response.data.user.username);
                dispatch({ type: 'SIGN_IN', token: userToken });
                return response.data;
            },
            signOut: async () => {
                await SecureStore.deleteItemAsync('userToken');
                dispatch({ type: 'SIGN_OUT' });
            },
        }),
        [setJwt, setUserName],
    );

    return <AuthContext.Provider value={{ state: authState, authContext }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
