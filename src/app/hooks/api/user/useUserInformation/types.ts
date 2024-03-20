export type UserGetEntryResponse = {
    id: string;
    username: string;
    email: string;
    createdAt: string; // Date parsable string
    updatedAt: string; // Date parsable string
    school: {
        schoolName: string;
    };
};
