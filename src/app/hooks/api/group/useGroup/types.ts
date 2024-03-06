export interface GroupAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Group {
    data: {
        id: number;
        attributes: GroupAttributes;
    };
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
