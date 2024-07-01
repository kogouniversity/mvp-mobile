export interface GroupPostsProps {
    postID: string;
}

export interface PostAttributes {
    title: string;
    createdAt: string;
    content: string;
    likes:number;
    commentCount:number;
    updatedAt: string;
    publishedAt: string;
}

export interface PostData {
    id: number;
    attributes: PostAttributes;
}

export interface ListPostResponse {
    data: PostData;
    meta: {};
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
