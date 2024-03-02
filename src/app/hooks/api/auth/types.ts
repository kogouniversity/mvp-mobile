import { UserEntry } from '../user/useUserInformation/types';

export type AuthUserDataResponse = {
    user: UserEntry;
    jwt: string;
};
