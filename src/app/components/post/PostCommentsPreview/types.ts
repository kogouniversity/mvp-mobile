export interface CommentAttributes {
    content: string;
    numOfLikes: number;
    createdAt: string;
    updatedAt: string;
    authorName: string;
    replyComment: {
        data: Comment[];
    };
}

export interface Comment {
    id: number;
    attributes: CommentAttributes;
}

export interface CommentsMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface ListCommentsResponse {
    data: Comment[];
    meta: CommentsMeta;
}
