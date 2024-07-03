export interface GroupPostsProps {
    userID: string;
}

export interface PostAttributeContent {
    type: string;
    children: { type: string; text: string }[];
}

export interface PostAttributes {
    title: string;
    createdAt: string;
    likes: number;
    commentCount: number;
    content: PostAttributeContent[];
    group?: Group;
}
export interface GroupData {
    id: number;
    attributes: {
        name: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}

export interface Group {
    data: GroupData;
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
}
