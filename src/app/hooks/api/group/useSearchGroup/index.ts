import { useEffect, useState } from 'react';
import axios from 'axios';

interface SearchGroupOptions {}

const fetchGroupBySearchKeyword = (keyword: string) => {
    return axios.get(`api/group?q=${keyword}`);
};

const useSearchGroup = (keyword: string, options: SearchGroupOptions) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
