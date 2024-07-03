export interface PostAttributes {
    title: string;
    content: string;
    likes: number;
    commentCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface Post {
    id: number;
    attributes: PostAttributes;
}

export interface CommentAttributes {
    content: string;
    likes: number;
    createdAt: string;
    updatedAt: string;
    authorName: string;
    replyComment: {
        data: Comment[];
    };
    post: {
        data: Post;
    };
    parentComment: {
        data: Comment[] | null;
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
