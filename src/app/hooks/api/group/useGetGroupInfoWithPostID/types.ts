export interface GroupAttributes {
    name: string;
    hasAddress: boolean;
    regionRestricted: boolean;
    enabled: boolean;
    description: string;
    userCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    isSchool: boolean;
}

export interface GroupData {
    id: number;
    attributes: GroupAttributes;
}

export interface Group {
    data: GroupData;
}

export interface PostAttributes {
    title: string;
    content: string;
    likes: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    group: Group;
}

export interface PostData {
    id: number;
    attributes: PostAttributes;
}

export interface PostWithGroupResponse {
    data: PostData;
    meta: Record<string, unknown>;
}
