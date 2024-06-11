export interface GroupAttributes {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description: string;
    userCount: number;
}

export interface Group {
    id: number;
    attributes: GroupAttributes;
}

export interface GroupResponse {
    data: Group;
    meta: Record<string, unknown>;
}
