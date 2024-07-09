export interface TagAttributes {
    value: string;
}

export interface Tag {
    id: number;
    attributes: TagAttributes;
}

export interface TagsData {
    data: Tag[];
}

export interface GroupAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    userCount: number;
    tags: TagsData;
}

export interface Group {
    id: number;
    attributes: GroupAttributes;
}

export interface GroupResponse {
    data: Group;
    meta: Record<string, unknown>;
}
