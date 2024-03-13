import { rest } from 'msw';
import { mswApiUrl, sleep } from '../../../utils';
import groupsData from './groups.json';

export const handlers = [
    rest.get(mswApiUrl('/api/groups'), async (req, res, ctx) => {
        await sleep(200);
        const userId = req.url.searchParams.get('filters[users]');
        if (userId) {
            const userGroups = groupsData.data.filter(group =>
                group.attributes.users.data.some(user => user.id === parseInt(userId, 10)),
            );
            return res(ctx.status(200), ctx.json({ data: userGroups }));
        }
        return res(ctx.status(200), ctx.json({ data: [] }));
    }),
];
