import { useEffect, useState } from 'react';
import axios from 'axios';
import { ListGroupResponse } from '../types';

interface SearchGroupOptions {}

const fetchGroupBySearchKeyword = (keyword: string) => axios.get(`api/group?q=${keyword}`);

const useSearchGroup = (
    keyword: string,
    options: SearchGroupOptions,
): { data: ListGroupResponse; loading: boolean; error: string | undefined } => {
    const [data, setData] = useState([] as unknown as ListGroupResponse);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        if (!keyword) return;

        setLoading(true);
        fetchGroupBySearchKeyword(keyword)
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [keyword]);

    return { data, loading, error };
};

export default useSearchGroup;
