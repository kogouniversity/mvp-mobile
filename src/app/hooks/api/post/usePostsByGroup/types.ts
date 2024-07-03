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
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    likes:number;
    commentCount:number;
    group: Group;
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

export interface GroupPostsProps {
    groupID: string;
}

export interface OptionType {
    label: string;
    value: string;
}

export interface SelectFieldProps {
    label: string;
    data: OptionType[];
    onSelect: (option: OptionType) => void;
}
