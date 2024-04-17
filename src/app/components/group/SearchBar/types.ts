export interface Icon {
    data: string | null;
}

export interface GroupAttributes {
    name: string;
    userCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    icon: Icon;
}

export interface Group {
    id: string;
    attributes: GroupAttributes;
}

export interface GroupSearchResponse {
    data: Group[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
