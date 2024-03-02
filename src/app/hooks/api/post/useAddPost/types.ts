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

export interface PostAttributes {
    content: any[];
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    group: Group;
}

export interface Post {
    id: number;
    attributes: PostAttributes;
}

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface ListPostResponse {
    data: Post[];
    meta: {
        pagination: Pagination;
    };
}
