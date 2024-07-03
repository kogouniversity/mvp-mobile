export interface PostAttributes {
    title: string;
    createdAt: string;
    content: string;
    likes:number;
    commentCount:number;
    updatedAt: string;
    publishedAt: string;
    group: {
        data: {
            id: number;
            attributes: {
                name: string;
                hasAddress: boolean;
                regionRestricted: boolean;
                enabled: boolean;
                description: string | null;
                userCount: number;
                createdAt: string;
                updatedAt: string;
                publishedAt: string;
                isSchool: boolean;
            };
        };
    };
}

export interface PostData {
    id: number;
    attributes: PostAttributes;
}

export type ListPostResponse = {
    data: PostData[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export interface GroupPostsProps {
    filter: string;
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
