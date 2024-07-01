export interface GroupPostsProps {
    groupID: string;
}

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

export interface Group {
    id: number;
    attributes: GroupAttributes;
}

export interface PostAttributes {
    title: string;
    createdAt: string;
    content: string;
    updatedAt: string;
    publishedAt: string;
    likes:number;
    commentCount:number;
    group: {
        data: Group;
    };
}

export interface PostData {
    id: number;
    attributes: PostAttributes;
}

export interface ListPostResponse {
    data: PostData[];
    meta: {
        pagination: {
            page: number;
            pageCount: number;
            pageSize: number;
            total: number;
        };
    };
}

export interface OptionType {
    label: string;
    value: string;
}

export interface SelectFieldProps {
    label: string;
    data: OptionType[];
    onSelect: (option: OptionType) => void;
    onPostPress: (postID: string) => void;
}
