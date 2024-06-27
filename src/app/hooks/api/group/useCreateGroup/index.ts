import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { captureAxiosError } from '../../../../utils/sentry';
import { useAuthToken } from '../../auth/useAuthToken';
import { ListGroupResponse } from '../types';

interface CreateGroupData {
    name: string;
    description: string;
}

const createGroup = async (groupData: CreateGroupData, jwt: string) => {
    try {
        const requestBody = {
            data: {
                name: groupData.name,
                description: groupData.description,
            },
        };

        const response = await axios.post('/api/groups', requestBody, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        captureAxiosError(axiosError);
        if (axiosError.response?.status === 404) {
            throw new Error('Error Creating Group');
        }
        throw error;
    }
};

export function useAddGroup(): UseMutationResult<ListGroupResponse, Error, CreateGroupData, unknown> {
    const jwt = useAuthToken();

    return useMutation({
        mutationFn: (groupData: CreateGroupData) => createGroup(groupData, jwt ?? ''),
        onError: (error: Error) => {
            console.error('Error creating group:', error);
        },
    });
}
