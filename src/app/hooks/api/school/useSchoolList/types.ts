export type SchoolListEntryResponse = {
    data: {
        id: number;
        attributes: {
            email_domain: string;
        };
    }[];
    error: object;
};
