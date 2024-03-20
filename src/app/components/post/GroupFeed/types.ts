export interface GroupPostsProps {
    groupName: string;
}

export interface PostAttributeContent {
    type: string;
    children: { type: string; text: string }[];
}

export interface PostAttributes {
    title: string;
    createdAt: string;
    content: PostAttributeContent[];
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
