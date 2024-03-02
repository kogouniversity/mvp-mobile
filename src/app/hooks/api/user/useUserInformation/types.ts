export type UserEntry = {
    id: string;
    username: string;
    email: string;
    createdAt: string; // Date parsable string
    updatedAt: string; // Date parsable string
};

export type UserGetEntryResponse = {
    user: UserEntry;
};
