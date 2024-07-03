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

export interface PostAttributeContent {
    type: string;
    children: { type: string; text: string }[];
}

export interface PostAttributes {
    title: string;
    createdAt: string;
    content: PostAttributeContent[];
    likes:number;
    commentCount:number;
    group?: Group;
}

export interface Post {
    id: number;
    attributes: PostAttributes;
}

export interface ListPostResponse {
    data: Post[];
    meta: {
        pagination: {
            page: number;
            pageCount: number;
            pageSize: number;
            total: number;
        };
    };
}
