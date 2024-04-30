import { UserGetEntryResponse } from '../user/useUserInformation/types';

export type AuthUserDataResponse = {
    user: UserGetEntryResponse;
    jwt: string;
};
