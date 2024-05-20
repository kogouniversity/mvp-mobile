interface Friend {
    id: number;
    name: string;
}

export interface FriendsResponse {
    data: Friend[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}
