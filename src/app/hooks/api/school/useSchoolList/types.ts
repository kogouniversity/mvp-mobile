export type SchoolListEntryResponse = {
    data: {
        id: number;
        attributes: {
            schoolEmailDomain: string;
            schoolName: string;
        };
    }[];
    meta: object;
};
