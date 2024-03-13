export interface UserAttributes {
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface UserEntry {
    id: number;
    attributes: UserAttributes;
}

export interface GroupAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    users: {
        data: UserEntry[];
    };
}

export interface Group {
    id: number;
    attributes: GroupAttributes;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface ListGroupResponse {
    data: Group[];
    meta: {
        pagination: Pagination;
    };
}
