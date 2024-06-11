export interface GroupPostsProps {
    filter: string;
}

export interface PostAttributes {
    title: string;
    createdAt: string;
    content: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Group {
    id: number;
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
}

export interface PostData {
    id: string;
    createdAt: string;
    title: string;
    content: string;
    updatedAt: string;
    publishedAt: string;
    group: Group;
}

export type ListPostResponse = PostData[];

export interface OptionType {
    label: string;
    value: string;
}

export interface SelectFieldProps {
    label: string;
    data: OptionType[];
    onSelect: (option: OptionType) => void;
}
